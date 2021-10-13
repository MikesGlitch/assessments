<template>
  <div class="">
    <RouterPrimaryButton to="/upload" text="Upload" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'
import RouterPrimaryButton from '@/components/buttons/RouterPrimaryButton.vue'

export default defineComponent({
  components: {
    RouterPrimaryButton,
  },
  setup() {
    const store = useUserStore()
    const { userId } = storeToRefs(store)

    return {
      userId,
    }
  },
})
</script>
