<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'radix-vue'

import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
}>()
</script>

<template>
  <AccordionRoot
    :type="type"
    :collapsible="collapsible"
    :default-value="defaultValue"
    class="w-full"
  >
    <slot />
  </AccordionRoot>
</template>

<style scoped>
.accordion-item {
  border-bottom: 1px solid #e5e7eb;
}

.accordion-trigger {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.accordion-trigger:hover {
  text-decoration: underline;
}

.accordion-trigger[data-state='open'] .icon {
  transform: rotate(180deg);
}

.icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.accordion-content {
  overflow: hidden;
  font-size: 0.875rem;
}

.accordion-content-inner {
  padding-bottom: 1rem;
}
</style>
