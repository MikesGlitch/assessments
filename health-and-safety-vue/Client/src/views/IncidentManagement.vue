<template>
  <div class="w-90p ml-5p p-0 my-4 shadow-lg border-gray-100 border-2 h-full flex flex-col">
    <div class="flex bg-isogray-3 items-center h-10">
      <h1 class="ml-4 font-bold flex-1">{{ bcTitle }}</h1>
      <div class="icon-container bg-blue-400 cursor-pointer">
        <i class="pi pi-filter"></i>
      </div>
      <div class="icon-container bg-green cursor-pointer" @click="onClickAdd()">
        <i class="pi pi-plus"></i>
      </div>
    </div>
    <RecordsView :items="products" :is-loading="loading"></RecordsView>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'
import RecordsView from '@/components/RecordsView.vue'
import { useRouter } from 'vue-router'
import { useStoreRecords } from '@/store/storeRecords'
import useBreadcrumbs from '@/composables/useBreadcrumbs'

export default defineComponent({
  name: 'IncidentManagement',
  components: {
    RecordsView,
  },
  setup() {
    const storeRecords = useStoreRecords()
    const { bcTitle } = useBreadcrumbs()
    const { records, isLoading } = toRefs(storeRecords)

    const router = useRouter()
    const onClickAdd = () => {
      router.push({ name: 'AddIncident' })
    }

    onMounted(() => storeRecords.getRecords())

    return {
      products: records,
      loading: isLoading,
      onClickAdd,
      bcTitle,
    }
  },
})
</script>

<style scoped>
.p-card-body {
  padding: 0 !important;
}
</style>
