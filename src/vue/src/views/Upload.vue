<template>
  <div class="flex flex-col">
    <h1>Upload</h1>
    <FileUpload
      :class="buttonClasses"
      mode="basic"
      name="demo[]"
      url="./upload.php"
      accept="image/*"
      :maxFileSize="1000000"
      @upload="onUpload"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'
import { primaryButtonClasses } from '@/components/buttons/buttonClasses'

export default defineComponent({
  components: { FileUpload },
  setup() {
    const toast = useToast()
    const onUpload = () => {
      toast.add({
        severity: 'info',
        summary: 'Success',
        detail: 'File Uploaded',
        life: 3000,
      })
    }

    return { onUpload, buttonClasses: primaryButtonClasses }
  },
})
</script>
