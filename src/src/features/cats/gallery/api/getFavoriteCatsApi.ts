import axios, { AxiosError } from "axios"
import { IFavoriteCat } from "../interfaces/IFavoriteCat"

interface IGetFavoriteCatsApi {
  successful: boolean
  errorMsg?: string,
  favorites: IFavoriteCat[]
}

const limit = 100

export async function getFavoriteCatsApi(subId: string): Promise<IGetFavoriteCatsApi> {
  const response = await axios.get<IFavoriteCat[]>(`/api/cats/favourites?limit=${limit}&sub_id=${subId}`)
    .then((res): IGetFavoriteCatsApi => {
      return { 
        successful: true,
        favorites: res.data
      }
    })
    .catch((error: AxiosError): IGetFavoriteCatsApi => {
      return { 
        successful: false,
        errorMsg: 'Unable to get favorites',
        favorites: []
      }
    })
  
  return response
}
