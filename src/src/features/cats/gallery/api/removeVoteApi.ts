import axios, { AxiosError } from "axios"

interface IRemoveVoteResponse {
  successful: boolean
  errorMsg?: string,
  voteId: string
}

export async function removeVoteApi(voteId: string): Promise<IRemoveVoteResponse> {
  const response = await axios.delete(`/api/cats/votes/${voteId}`)
    .then((res): IRemoveVoteResponse => {
      return { 
        successful: true,
        voteId: voteId
      }
    })
    .catch((error: AxiosError): IRemoveVoteResponse => {
      return { 
        successful: false,
        errorMsg: 'Unable to remove the vote',
        voteId: voteId
      }
    })
  
  return response
}
