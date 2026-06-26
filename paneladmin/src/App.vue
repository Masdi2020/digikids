<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useAdminStore } from './stores/adminStore'
import { useAuthStore } from './stores/authStore'

const adminStore = useAdminStore()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isAuthenticated) {
    adminStore.loadAll()
  }
})

watch(
  () => authStore.isAuthenticated,
  (isAuthenticated) => {
    if (isAuthenticated) {
      adminStore.loadAll()
    }
  },
)
</script>
