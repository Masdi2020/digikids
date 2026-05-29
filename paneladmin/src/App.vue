<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAdminStore } from './stores/adminStore'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.loadAll()
})
</script>
