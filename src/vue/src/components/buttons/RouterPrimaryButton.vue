<template>
  <router-link :to="to" tag="button" :class="classes">{{ text }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { primaryButtonClasses } from './buttonClasses'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    const classes = primaryButtonClasses

    return {
      classes,
    }
  },
})
</script>
