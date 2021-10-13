<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/upload">Upload</router-link>
  </div> -->
  <Nav />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/userStore'
import Nav from '@/components/Nav.vue'

export default defineComponent({
  components: { Nav },
  setup() {
    const store = useUserStore()
    store.initUserId()
  },
})
</script>
