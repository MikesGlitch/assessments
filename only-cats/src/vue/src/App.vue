<template>
  <Nav />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/userStore'
import Nav from '@/components/Nav.vue'
import useRouteMetadata from '@/composables/useRouteMetadata'
export default defineComponent({
  components: { Nav },
  setup() {
    const store = useUserStore()
    store.initUserId()
    useRouteMetadata()
  },
})
</script>
