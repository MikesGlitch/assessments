import axios, { AxiosError } from "axios"

interface IUploadCatResponse {
  successful: boolean
  errorMsg?: string
}

export async function uploadCat(fileToUpload: File): Promise<IUploadCatResponse> {
  let formData = new FormData();
  formData.append('file', fileToUpload);

 let uploadResponse = await axios.post<IUploadCatResponse>('/api/cats/images/upload', formData)
    .then((res): IUploadCatResponse => {
      return { 
        successful: true
      }
    })
    .catch((error: AxiosError): IUploadCatResponse => {
      return { 
        successful: false,
        errorMsg: 'Image was too big, did not contain a Cat, was inappropriate, or the wrong file type'
      }
    })

  return uploadResponse
}
