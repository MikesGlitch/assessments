<template>
  <div class="flex flex-col sm:w-1/3 m-auto">
    <div v-if="!imagePreviewSrc">
      <h1 class="text-3xl font-bold">Upload your kitty cat</h1>
      <div class="text-center">
        <FileUpload
          :class="buttonClasses"
          mode="basic"
          name="file"
          accept="image/*"
          :auto="false"
          @select="onSelectFile"
          :customUpload="true"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2" v-if="imagePreviewSrc">
      <h1 class="text-3xl font-bold">Preview</h1>
      <img :src="imagePreviewSrc" className="flex mx-auto my-4" style="max-height: 500px" />
      <PrimaryButton class="w-full" text="Upload" @click="onUploadFile" />
      <PrimaryButton class="w-full" text="Remove" @click="onRemoveFile" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import FileUpload from 'primevue/fileupload'
import { primaryButtonClasses } from '@/components/buttons/buttonClasses'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import { useUploadCatStore } from '@/store/uploadCatsStore'

export default defineComponent({
  components: { FileUpload, PrimaryButton },
  setup() {
    const imagePreviewSrc: Ref<string | ArrayBuffer | null> = ref(null)
    const selectedFile: Ref<File | null> = ref(null)

    const onSelectFile = (ev: { originalEvent: any; files: unknown[] }) => {
      selectedFile.value = ev.files[0] as File
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          imagePreviewSrc.value = event.target.result
        }
      }

      reader.readAsDataURL(selectedFile.value)
    }

    const store = useUploadCatStore()
    const onUploadFile = () => {
      if (selectedFile.value) {
        store.uploadCat(selectedFile.value)
      }
    }

    const onRemoveFile = () => {
      imagePreviewSrc.value = null
      selectedFile.value = null
    }

    return { onSelectFile, buttonClasses: primaryButtonClasses, imagePreviewSrc, onUploadFile, onRemoveFile }
  },
})
</script>
