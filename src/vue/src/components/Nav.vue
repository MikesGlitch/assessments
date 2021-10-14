<template>
  <nav class="px-4 flex justify-between bg-isoblue h-16 w-full">
    <!-- top bar left -->
    <ul class="flex items-center">
      <!-- add HOME button -->
      <li class="h-6 w-6 cursor-pointer" @click="onClickHome()">
        <CatIcon />
      </li>
    </ul>
    <ul class="flex items-center">
      <li class="cursor-pointer">
        <RouterPrimaryButton to="/upload" text="Upload" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import CatIcon from '@/components/icons/CatIcon.vue'
import RouterPrimaryButton from '@/components/buttons/RouterPrimaryButton.vue'

export default defineComponent({
  components: { CatIcon, RouterPrimaryButton },
  setup() {
    const router = useRouter()
    const onClickHome = () => {
      router.push({ name: 'Home' })
    }

    return {
      onClickHome,
    }
  },
})
</script>
