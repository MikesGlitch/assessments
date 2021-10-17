<template>
  <div class="m-2">
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
          <div class="flex justify-between">
            <span class="font-bold">Score: {{ cat.score }}</span>
            <div class="flex justify-between gap-2">
              <!-- {{cat}} -->
              <span>Fav: {{ cat.isFav }}</span>
              <span>Like: {{ cat.thumbsUp }}</span>
              <span>Disike: {{ cat.thumbsDown }}</span>
            </div>
          </div>
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
    const { cats } = storeToRefs(catsStore)
    onMounted(() => catsStore.getCats(0))

    // const score = (cat) => {
    //   const votesForCat = state.catsGallery.votes.filter((vote) => vote.image_id === props.cat.id);
    //   const upvotes = votesForCat.filter(vote => vote.value === 1);
    //   const downvotes = votesForCat.filter(vote => vote.value === 0);
    //   return upvotes.length - downvotes.length;
    // }

    return {
      userId,
      cats,
    }
  },
})
</script>
