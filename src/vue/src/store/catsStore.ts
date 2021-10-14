import axios from 'axios'
import { defineStore } from 'pinia'

interface GetCatsResponse {
  cats: ICat[]
  paginationCount: number
}

export interface ICat {
  id: string
  url: string
  width: number
  height: number
  sub_id?: string
  created_at: Date
  original_filename: string
}

export interface IFavoriteCat {
  id: string
  image_id: string
  sub_id: string
}

export interface IVote {
  id: string
  image_id: string
  sub_id: string
  value: number
}

export const useCatsStore = defineStore('catStore', {
  state: () => ({
    userId: null as string | null,
    cats: [] as ICat[],
    nextPage: 0 as number,
    hasMoreData: true as boolean,
    status: 'loading' as 'loading' | 'failed' | 'successful',
  }),
  actions: {
    async getCats(page: number) {
      if (page === 0) {
        // resetting the cats state when calling getCatsAsync for data on first page
        this.cats = []
        this.nextPage = 0
        this.hasMoreData = true
      }

      this.status = 'loading'

      const limit = 16
      const response = await axios.get<ICat[]>(
        `https://only-cats.vercel.app/api/cats/images?limit=${limit}&page=${page}`
      )

      this.cats = [...this.cats, ...response.data]
      this.hasMoreData = this.cats.length < response.headers['pagination-count']

      if (this.hasMoreData) {
        this.nextPage = this.nextPage + 1
      }

      this.status = 'successful'
    },
  },
})
