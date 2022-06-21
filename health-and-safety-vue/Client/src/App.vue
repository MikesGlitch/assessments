<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-col">
      <Header />
      <PrimeVueBreadcrumb v-if="bcItems" :home="bcHome" :model="bcItems" />
    </div>
    <div class="flex-1 h-full flex flex-col overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import useBreadcrumbs from '@/composables/useBreadcrumbs'

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    const { bcHome, bcItems, bcTitle } = useBreadcrumbs()

    return {
      bcHome,
      bcItems,
      bcTitle,
    }
  },
})
</script>
