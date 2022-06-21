<template>
  <div class="flex items-center">
    <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: status.colour }"></div>
    <div class="ml-1" :style="{ color: status.colour }">{{ status.description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StatusType } from '@/typings/StatusType'
import { statuses } from '@/data'

export default defineComponent({
  name: 'Status',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const status: StatusType =
      statuses.find((s) => {
        return s.id === props.id
      }) || statuses[0]

    return {
      status,
    }
  },
})
</script>
