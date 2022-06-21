<template>
  <div>
    <div class="card">
      <DataTable
        :value="items"
        responsive-layout="scroll"
        breakpoint="960px"
        :loading="isLoading"
        sort-field="recordNumber"
        :sort-order="1"
        :row-class="() => 'bg-isogray-4'"
      >
        <Column field="recordNumber" headerClass="bg-isoblue" class="align-top">
          <template #body="slotProps">
            <div>
              <h1>Record#</h1>
              <p class="text-black text-xl font-bold">{{ slotProps.data.recordNumber }}</p>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-isoblue" class="align-top">
          <template #body="slotProps">
            <h1>What happened?</h1>
            <p class="text-black text-xl font-bold">{{ slotProps.data.description }}</p>
          </template>
        </Column>
        <Column headerClass="bg-isoblue" class="align-top">
          <template #body="slotProps">
            <h1>Date occurred:</h1>
            <p class="text-black text-xl font-bold">{{ formatDate(slotProps.data.dateOriginal) }}</p>
            <h1>Section:</h1>
            <p class="text-black text-xl font-bold">{{ slotProps.data.section }}</p>
          </template>
        </Column>
        <Column headerClass="bg-isoblue" class="align-top">
          <template #body="slotProps">
            <h1>Impact type:</h1>
            <Tags :items="slotProps.data.impactTypes" />
          </template>
        </Column>
        <Column headerClass="bg-isoblue" class="align-top">
          <template #body="slotProps">
            <h1>Event type:</h1>
            <Tags :items="slotProps.data.eventTypes" />
          </template>
        </Column>
        <Column headerClass="bg-isoblue">
          <template #body="">
            <div class="flex items-center justify-between">
              <span>Actions:</span>
              <Button
                v-tooltip.top="'Add action'"
                label="Add"
                icon="pi pi-plus"
                icon-pos="left"
                class="p-button-outlined p-button-success p-button-sm ml-2"
                @click="toggleActionDialog"
              />
            </div>
            <Dialog v-model:visible="showActionDialog" header="Add action">Action dialog</Dialog>
            <div class="flex items-center justify-between">
              <span>Finding:</span>
              <Button
                v-tooltip.top="'Add finding'"
                label="Add"
                icon="pi pi-plus"
                icon-pos="left"
                class="p-button-outlined p-button-success p-button-sm ml-2"
                @click="toggleFindingDialog"
              />
            </div>
            <Dialog v-model:visible="showFindingDialog" header="Add finding">Finding dialog</Dialog>
          </template>
        </Column>
        <Column headerClass="bg-isoblue" :style="{ 'min-width': '220px' }">
          <template #body="slotProps">
            <Status :id="slotProps.data.status" />
            <h1>Modified: {{ formatDate(slotProps.data.dateModified) }}</h1>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tags from '@/components/Tags.vue'
import Status from '@/components/Status.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'RecordsView',
  components: {
    Tags,
    Status,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    //Date Formating logic
    const formatDate = (date: number) => {
      return dayjs.unix(date).format('DD/MM/YYYY')
    }
    const showActionDialog = ref(false)
    const showFindingDialog = ref(false)
    const toggleActionDialog = () => (showActionDialog.value = !showActionDialog.value)
    const toggleFindingDialog = () => (showFindingDialog.value = !showFindingDialog.value)

    return {
      formatDate,
      showActionDialog,
      showFindingDialog,
      toggleActionDialog,
      toggleFindingDialog,
    }
  },
})
</script>

<style scoped></style>
