import router from '@/router'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUploadCatStore = defineStore('uploadCatStore', {
  state: () => ({
    status: 'loading' as 'loading' | 'failed' | 'successful',
    errorMsg: null as string | null,
  }),
  actions: {
    async uploadCat(fileToUpload: File) {
      this.status = 'loading'
      this.errorMsg = null

      const formData = new FormData()
      formData.append('file', fileToUpload)

      await axios
        .post('https://only-cats.vercel.app/api/cats/images/upload', formData)
        .then(() => {
          this.status = 'successful'
          router.push('/')

          return {
            successful: true,
          }
        })
        .catch(() => {
          this.errorMsg = 'Image was too big, did not contain a Cat, was inappropriate, or the wrong file type'
          this.status = 'failed'
          alert(this.errorMsg)
        })
    },
  },
})
