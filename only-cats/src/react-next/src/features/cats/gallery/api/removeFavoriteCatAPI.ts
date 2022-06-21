import axios, { AxiosError } from "axios"

interface IRemoveFavoriteCatResponse {
  successful: boolean
  errorMsg?: string,
  favoriteId: string
}

export async function removeFavoriteCatAPI(favoriteId: string): Promise<IRemoveFavoriteCatResponse> {
  const response = await axios.delete(`/api/cats/favourites/${favoriteId}`)
    .then((res): IRemoveFavoriteCatResponse => {
      return { 
        successful: true,
        favoriteId: favoriteId,
      }
    })
    .catch((error: AxiosError): IRemoveFavoriteCatResponse => {
      return { 
        successful: false,
        errorMsg: 'Unable to unfavorite the cat',
        favoriteId: favoriteId,
      }
    })
  
  return response
}
