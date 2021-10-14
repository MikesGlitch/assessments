<template>
  <div class="flex flex-col">
    <h1>Upload</h1>
    <FileUpload
      :class="buttonClasses"
      mode="advanced"
      name="demo[]"
      accept="image/*"
      :auto="false"
      :maxFileSize="1000000"
      @select="onSelectFile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUpload from 'primevue/fileupload'
import { primaryButtonClasses } from '@/components/buttons/buttonClasses'

export default defineComponent({
  components: { FileUpload },
  setup() {
    const onSelectFile = () => {
      alert('selected')
    }

    return { onSelectFile, buttonClasses: primaryButtonClasses }
  },
})
</script>
