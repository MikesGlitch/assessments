import axios, { AxiosError } from "axios"

interface IFavoriteCatResponse {
  successful: boolean
  errorMsg?: string,
  imageId: string,
  userId: string,
  id?: string
}

export async function addFavoriteCatAPI(imageId: string, userId: string): Promise<IFavoriteCatResponse> {
  const response = await axios.post(`/api/cats/favourites/`, { image_id: imageId, sub_id: userId })
    .then((res): IFavoriteCatResponse => {
      return { 
        successful: true,
        imageId: imageId,
        userId: userId,
        id: res.data.id
      }
    })
    .catch((error: AxiosError): IFavoriteCatResponse => {
      return { 
        successful: false,
        errorMsg: 'Unable to favorite the cat',
        imageId: imageId,
        userId: userId
      }
    })
  
  return response
}
