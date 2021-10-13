import axios, { AxiosError } from "axios"
import { IVote } from "../interfaces/IVote"

interface IGetVotesApi {
  successful: boolean
  errorMsg?: string,
  votes: IVote[]
}

const limit = 100000

export async function getVotesApi(): Promise<IGetVotesApi> { 
  // todo - figure out paging here
  const response = await axios.get<IVote[]>(`/api/cats/votes?limit=${limit}`)
    .then((res): IGetVotesApi => {
      return { 
        successful: true,
        votes: res.data
      }
    })
    .catch((error: AxiosError): IGetVotesApi => {
      return { 
        successful: false,
        errorMsg: 'Unable to get votes',
        votes: []
      }
    })
  
  return response
}
