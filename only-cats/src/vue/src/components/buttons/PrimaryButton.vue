<template>
  <button :class="classes">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { primaryButtonClasses } from './buttonClasses'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  setup() {
    const classes = primaryButtonClasses

    return {
      classes,
    }
  },
})
</script>
