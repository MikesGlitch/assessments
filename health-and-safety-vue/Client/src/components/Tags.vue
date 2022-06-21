<template>
  <div ref="root" class="relative flex flex-wrap w-full overflow-hidden">
    <div
      v-for="(tag, index) in tags"
      :ref="
        (el) => {
          if (el) divs[index] = el
        }
      "
      :key="tag"
      class="m-1 p-1 text-xs rounded bg-isoblue text-white text-center font-bold"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watchEffect } from 'vue'
import { TagType } from '@/typings/IncidentTypes'

export default defineComponent({
  props: {
    items: {
      type: Object as PropType<TagType[]>,
      required: true,
    },
  },
  setup(props) {
    const root = ref<HTMLDivElement>()
    const divs = ref<HTMLDivElement[]>([])
    const { items: tags } = toRefs(props)

    watchEffect(
      () => {
        let lastTagIndex = -1
        let remaining = 0
        let offsetHeight = root.value?.offsetHeight || 0
        let scrollHeight = root.value?.scrollHeight || 0

        if (offsetHeight < scrollHeight) {
          //tag container overflowing
          //find the first overflowing tag
          divs.value.forEach((div, index) => {
            if (div.offsetTop > offsetHeight) {
              if (lastTagIndex === -1) {
                //get the index of the last visible tag
                lastTagIndex = index - 1
                //get the remaining number of tags
                remaining = divs.value.length + 1 - index
              }
            }
          })
        }

        if (lastTagIndex > 0) {
          tags.value[lastTagIndex].name = `...${remaining} More`
          //remove the overflowing tags - prevents an edge case
          tags.value.splice(lastTagIndex + 1)
        }
      },
      {
        flush: 'post',
      }
    )

    return {
      root,
      divs,
      tags,
    }
  },
})
</script>
