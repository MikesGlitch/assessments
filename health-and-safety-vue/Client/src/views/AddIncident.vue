<template>
  <div class="w-90p ml-5p p-0 my-4 shadow-lg border-gray-100 border-2 h-full flex flex-col">
    <div class="flex bg-isogray-3 items-center h-10">
      <h1 class="ml-4 font-bold flex-1">{{ bcTitle }}</h1>
      <div class="icon-container bg-blue-400">
        <i class="pi pi-sitemap"></i>
      </div>
      <div class="icon-container bg-rouge cursor-pointer" @click="onClickClose()">
        <i class="pi pi-times"></i>
      </div>
    </div>
    <div>
      <div class="grid grid-cols-2 m-8 gap-4">
        <div class="col-span-2">
          <FormLabel for-id="whatHappened" label="What happened?" />
          <InputText id="whatHappened" v-model="formData.description" class="w-full" type="text" />
        </div>
        <div>
          <FormLabel for-id="dateOccoured" label="Date Occoured" />
          <Calendar id="dateOccoured" v-model="formData.dateOriginal" class="w-full" :max-date="new Date()" />
        </div>
        <div>
          <FormLabel for-id="section" label="Section" />
          <TreeSelect
            id="section"
            v-model="formData.section"
            class="w-full"
            :options="sections"
            placeholder="Select Section"
            @node-select="sectionChanged"
          ></TreeSelect>
        </div>
        <div>
          <FormLabel for-id="impactTypes" label="Impact Type" />
          <MultiSelect
            id="impactTypes"
            v-model="formData.impactTypes"
            class="w-full"
            :options="impactOptions"
            placeholder="Select Impact Type"
            display="chip"
          />
        </div>
        <div>
          <FormLabel for-id="eventTypes" label="Event Type" />
          <MultiSelect
            id="eventTypes"
            v-model="formData.eventTypes"
            class="w-full"
            :options="eventOptions"
            placeholder="Select Event Type"
            display="chip"
          />
        </div>
        <div>
          <FormLabel for-id="status" label="Status" />
          <Dropdown
            id="status"
            v-model="formData.status"
            class="w-full"
            :options="statuses"
            option-label="description"
            placeholder="Select Status"
            display="chip"
          />
        </div>
      </div>
    </div>

    <div class="mx-8 ml-auto">
      <Button
        v-tooltip.top="'Add incident'"
        label="Confirm"
        class="bg-isoblue font-bold p-button-sm"
        @click="onClickConfirm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IncidentTypeFormData, TagType } from '@/typings/IncidentTypes'
import useGuid from '@/composables/useGuid'
import FormLabel from '@/components/FormLabel.vue'

import { useStoreRecords } from '@/store/storeRecords'
import { sections, statuses, impactOptions, eventOptions, TreeViewType } from '@/data'
import useBreadcrumbs from '@/composables/useBreadcrumbs'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    FormLabel,
  },
  setup() {
    const { getGuid } = useGuid()
    const router = useRouter()
    const records = useStoreRecords()
    const { bcTitle } = useBreadcrumbs()

    // I generally avoid putting form data in state unless absolutely required
    const formData = ref<IncidentTypeFormData>({
      description: '',
      dateOriginal: undefined,
      section: undefined,
      impactTypes: [],
      eventTypes: [],
      status: undefined,
    })

    const selectedSection = ref<string | undefined>(undefined)
    const sectionChanged = (node: TreeViewType) => (selectedSection.value = node.data)

    const onClickClose = () => {
      //Close without saving
      router.push({ name: 'IncidentManagement' })
    }

    const onClickConfirm = () => {
      if (!selectedSection.value) {
        alert('Please enter a section')
        return
      }

      if (!formData.value.dateOriginal) {
        alert('Please enter a date')
        return
      }

      if (!formData.value.status) {
        alert('Please enter a status')
        return
      }

      const impactTypes = formData.value.impactTypes.map((impactType): TagType => {
        return {
          incidentTypeId: undefined,
          id: getGuid(),
          name: impactType,
        }
      })

      const eventTypes = formData.value.impactTypes.map((eventType): TagType => {
        return {
          incidentTypeId: undefined,
          id: getGuid(),
          name: eventType,
        }
      })

      records.addRecord({
        id: undefined,
        recordNumber: '103', // expecting me to create a random number here? what about 999999?
        description: formData.value.description,
        dateOriginal: dayjs(formData.value.dateOriginal).unix(),
        section: selectedSection.value,
        impactTypes: impactTypes,
        eventTypes: eventTypes,
        status: formData.value.status.id,
        action: '',
        finding: '',
        dateModified: dayjs().unix(),
      })

      router.push({ name: 'IncidentManagement' })
    }

    return {
      onClickClose,
      sections,
      onClickConfirm,
      impactOptions,
      eventOptions,
      statuses,
      bcTitle,
      formData,
      sectionChanged,
    }
  },
})
</script>

<style scoped></style>
