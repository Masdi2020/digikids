# Panel Admin BijakGadget

Panel admin ini adalah aplikasi Vue + Vite yang berdiri sendiri.

## Jalankan lokal

```bash
cd paneladmin
npm install
copy .env.example .env
npm run dev
```

## Env Supabase

Isi `paneladmin/.env` dengan:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Helper Supabase ada di `src/lib/supabase.ts`.

## Catatan

- Admin sekarang berjalan di root app-nya sendiri, bukan di subpath website publik.
- Source aktif admin ada di `paneladmin/src`.
- State masih memakai Pinia + data lokal, jadi tahap berikutnya tinggal mengganti CRUD di store ke query Supabase.
