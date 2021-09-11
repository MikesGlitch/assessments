import axios from "axios"
import { ICat } from "../interfaces/ICat"

interface GetCatsResponse {
  cats: ICat[],
  paginationCount: number
}

const limit = 16 

export async function getCats(page: number): Promise<GetCatsResponse> {
  const response = await axios.get(`/api/cats/images?limit=${limit}&page=${page}`)
  const paginationCount = response.headers['pagination-count']

  return { 
    cats: response.data,
    paginationCount: paginationCount
   }
}
