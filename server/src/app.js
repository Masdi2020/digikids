import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

function isAllowedOrigin(origin) {
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    return true
  }

  if (process.env.NODE_ENV !== 'production') {
    try {
      const url = new URL(origin)
      return ['localhost', '127.0.0.1'].includes(url.hostname)
    } catch {
      return false
    }
  }

  return false
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origin not allowed by CORS'))
    },
  })
)
app.use(express.json({ limit: '2mb' }))

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment')
}

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

function requireSupabase(req, res, next) {
  if (!supabase) {
    res.status(500).json({ error: 'Supabase is not configured on the server.' })
    return
  }
  next()
}

async function requireAuth(req, res, next) {
  if (!supabase) {
    res.status(500).json({ error: 'Supabase is not configured on the server.' })
    return
  }

  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) {
    res.status(401).json({ error: 'Authentication is required.' })
    return
  }

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    res.status(401).json({ error: 'Invalid or expired session.' })
    return
  }

  req.user = data.user
  next()
}

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function mapArticleRow(row) {
  if (!row) return null
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    category: row.category,
    date: row.date_label || '',
    readTime: row.read_time || '',
    author: row.author || '',
    role: row.role || '',
    img: row.img_url || '',
    excerpt: row.excerpt || '',
    lead: row.lead || '',
    sections: row.sections || [],
    references: row.references_json || [],
  }
}

function mapVideoRow(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    duration: row.duration || '',
    views: row.views || '',
    likes: row.likes || '',
    category: row.category || '',
    tag: row.tag || '',
    img: row.img_url || '',
    youtubeId: row.youtube_id || '',
    featured: Boolean(row.featured),
  }
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.post('/api/uploads/image', requireSupabase, requireAuth, upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      res.status(400).json({ error: 'File is required.' })
      return
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      res.status(500).json({ error: 'Cloudinary is not configured.' })
      return
    }

    const folder = process.env.CLOUDINARY_FOLDER || 'digikids'

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )

      streamifier.createReadStream(file.buffer).pipe(stream)
    })

    res.json({ url: uploadResult.secure_url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to upload image.' })
  }
})

app.get('/api/articles', requireSupabase, async (req, res) => {
  const type = req.query.type

  let query = supabase.from('articles').select('*').order('created_at', { ascending: false })
  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json(data.map(mapArticleRow))
})

app.get('/api/articles/:id', requireSupabase, async (req, res) => {
  const { data, error } = await supabase.from('articles').select('*').eq('id', req.params.id).maybeSingle()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  if (!data) {
    res.status(404).json({ error: 'Article not found.' })
    return
  }

  res.json(mapArticleRow(data))
})

app.post('/api/articles', requireSupabase, requireAuth, async (req, res) => {
  const payload = req.body || {}

  const id = payload.id || `${payload.type || 'artikel'}-${slugify(payload.title || 'artikel')}-${Date.now()}`

  const insertRow = {
    id,
    type: payload.type,
    title: payload.title,
    category: payload.category,
    date_label: payload.date || '',
    read_time: payload.readTime || '',
    author: payload.author || '',
    role: payload.role || '',
    img_url: payload.img || '',
    excerpt: payload.excerpt || '',
    lead: payload.lead || '',
    sections: payload.sections || [],
    references_json: payload.references || [],
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from('articles').insert(insertRow).select('*').single()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json(mapArticleRow(data))
})

app.put('/api/articles/:id', requireSupabase, requireAuth, async (req, res) => {
  const payload = req.body || {}

  const updateRow = {
    type: payload.type,
    title: payload.title,
    category: payload.category,
    date_label: payload.date || '',
    read_time: payload.readTime || '',
    author: payload.author || '',
    role: payload.role || '',
    img_url: payload.img || '',
    excerpt: payload.excerpt || '',
    lead: payload.lead || '',
    sections: payload.sections || [],
    references_json: payload.references || [],
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from('articles').update(updateRow).eq('id', req.params.id).select('*').single()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json(mapArticleRow(data))
})

app.delete('/api/articles/:id', requireSupabase, requireAuth, async (req, res) => {
  const { error } = await supabase.from('articles').delete().eq('id', req.params.id)
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.json({ ok: true })
})

app.get('/api/videos', requireSupabase, async (req, res) => {
  const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.json(data.map(mapVideoRow))
})

app.post('/api/videos', requireSupabase, requireAuth, async (req, res) => {
  const payload = req.body || {}

  const insertRow = {
    title: payload.title,
    duration: payload.duration || '',
    views: payload.views || '',
    likes: payload.likes || '',
    category: payload.category || '',
    tag: payload.tag || '',
    img_url: payload.img || '',
    youtube_id: payload.youtubeId || '',
    featured: Boolean(payload.featured),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from('videos').insert(insertRow).select('*').single()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json(mapVideoRow(data))
})

app.put('/api/videos/:id', requireSupabase, requireAuth, async (req, res) => {
  const payload = req.body || {}

  const updateRow = {
    title: payload.title,
    duration: payload.duration || '',
    views: payload.views || '',
    likes: payload.likes || '',
    category: payload.category || '',
    tag: payload.tag || '',
    img_url: payload.img || '',
    youtube_id: payload.youtubeId || '',
    featured: Boolean(payload.featured),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from('videos').update(updateRow).eq('id', req.params.id).select('*').single()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json(mapVideoRow(data))
})

app.delete('/api/videos/:id', requireSupabase, requireAuth, async (req, res) => {
  const { error } = await supabase.from('videos').delete().eq('id', req.params.id)
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.json({ ok: true })
})

app.get('/api/panduan', requireSupabase, async (req, res) => {
  const { data, error } = await supabase.from('panduan_content').select('*').eq('id', 'default').maybeSingle()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  if (!data) {
    res.json({
      screenTime: [],
      parentalSteps: [],
      faqItems: [],
      familyRules: [],
    })
    return
  }

  res.json({
    screenTime: data.screen_time || [],
    parentalSteps: data.parental_steps || [],
    faqItems: data.faq_items || [],
    familyRules: data.family_rules || [],
  })
})

app.put('/api/panduan', requireSupabase, requireAuth, async (req, res) => {
  const payload = req.body || {}

  const upsertRow = {
    id: 'default',
    screen_time: payload.screenTime || [],
    parental_steps: payload.parentalSteps || [],
    faq_items: payload.faqItems || [],
    family_rules: payload.familyRules || [],
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('panduan_content')
    .upsert(upsertRow, { onConflict: 'id' })
    .select('*')
    .single()

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json({
    screenTime: data.screen_time || [],
    parentalSteps: data.parental_steps || [],
    faqItems: data.faq_items || [],
    familyRules: data.family_rules || [],
  })
})

export default app
