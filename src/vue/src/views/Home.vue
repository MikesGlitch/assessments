<template>
  <div class="">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="cat in cats" :key="cat.id">
        <template #header>
          <figure class="relative" style="padding-top: 75%">
            <img
              class="h-full w-full top-0 left-0 right 0 bottom 0 absolute"
              :alt="cat.original_filename"
              :src="cat.url"
            />
          </figure>
        </template>
        <template #content>
          <span
            >Buttons here - has to be content instead of footer cause of constant content padding. I don't like
            primevue...</span
          >
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useUserStore } from '@/store/userStore'
import { useCatsStore } from '@/store/catsStore'
import { storeToRefs } from 'pinia'
import Card from 'primevue/card'

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const store = useUserStore()
    const { userId } = storeToRefs(store)

    const catsStore = useCatsStore()
    const { cats, nextPage } = storeToRefs(catsStore)
    onMounted(() => catsStore.getCats(0))

    return {
      userId,
      cats,
    }
  },
})
</script>
