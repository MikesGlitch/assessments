<template>
  <label class="block tracking-wide font-bold mb-2" :for="forId">{{ label }}</label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormLabel',
  props: {
    label: {
      type: String,
      required: true,
    },
    forId: {
      type: String,
      required: true,
    },
  },
})
</script>
