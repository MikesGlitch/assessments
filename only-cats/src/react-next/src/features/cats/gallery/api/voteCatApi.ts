import axios, { AxiosError } from "axios"

interface IUpvoteCatResponse {
  successful: boolean
  errorMsg?: string,
  imageId: string,
  userId: string,
  id?: string,
  vote: number
}

export async function voteCatApi(imageId: string, userId: string, vote: number): Promise<IUpvoteCatResponse> {
  const response = await axios.post(`/api/cats/votes`, { image_id: imageId, sub_id: userId, value: vote })
    .then((res): IUpvoteCatResponse => {
      return { 
        successful: true,
        imageId: imageId,
        userId: userId,
        id: res.data.id,
        vote: vote
      }
    })
    .catch((error: AxiosError): IUpvoteCatResponse => {
      return { 
        successful: false,
        errorMsg: 'Unable to upvote the cat',
        imageId: imageId,
        userId: userId,
        vote: vote
      }
    })
  
  return response
}
