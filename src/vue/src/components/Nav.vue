<template>
  <nav class="px-4 flex justify-between bg-isoblue h-16 w-full">
    <!-- top bar left -->
    <ul class="flex items-center">
      <!-- add HOME button -->
      <li class="h-6 w-6 cursor-pointer" @click="onClickHome()">
        <svg viewBox="0 0 36 32" fill="#ffffff" height="100%">
          <path
            d="M18 7.188L4.342 19.232c-.101.091-.231.134-.342.209V31a1 1 0 001 1h8a1 1 0 001-1v-8a1 1 0 011-1h6a1 1 0 011 1v8a1 1 0 001 1h8a1 1 0 001-1V19.444c-.106-.073-.233-.114-.329-.2zm17.668 7.58L19.672.643C19.232.244 18.645 0 18.002 0s-1.23.244-1.672.645l.002-.002-16 14.125a.999.999 0 00-.075 1.413l-.001-.001 1.338 1.489a.999.999 0 001.413.075l-.001.001L17.339 5.102a.998.998 0 011.325.001l-.001-.001 14.332 12.642a.998.998 0 001.411-.075l.001-.001 1.337-1.489a.998.998 0 00-.075-1.411l-.001-.001z"
          />
        </svg>
      </li>
    </ul>

    <ul class="flex items-center">
      <!-- add ISOMETRIX button -->
      <li class="h-6 w-6">
        <svg viewBox="0 0 48 32" fill="#ffffff" height="100%">
          <path
            d="M16.134 0L0 32h13.838l9.23-18.272L16.133 0zM32.283 0l-6.919 13.728L34.579 32h13.854L32.284 0zM16.134 32h16.149l-8.067-15.992L16.133 32z"
          />
        </svg>
      </li>
    </ul>

    <!-- to bar right  -->
    <ul class="flex items-center">
      <li class="h-10 w-10">
        <!-- <Avatar /> -->
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
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
