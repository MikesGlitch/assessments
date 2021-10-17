import axios from 'axios'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

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
  score: number
  isFav: boolean
  thumbsUp: boolean
  thumbsDown: boolean
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
    votes: [] as any[],
    favorites: [] as any[],
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
      await Promise.all([this.getVotes(), this.getFavorites()])

      const limit = 100
      const response = await axios.get<ICat[]>(
        `https://only-cats.vercel.app/api/cats/images?limit=${limit}&page=${page}`
      )

      const userStore = useUserStore()
      response.data.map((cat) => {
        const votesForCat = this.votes.filter((vote) => vote.image_id === cat.id)
        const upvotes = votesForCat.filter((vote) => vote.value === 1)
        const downvotes = votesForCat.filter((vote) => vote.value === 0)
        cat.score = upvotes.length - downvotes.length

        cat.isFav = this.votes.find((fav) => fav.image_id === cat.id && fav.sub_id == userStore.userId) != null
        cat.thumbsUp =
          this.votes.find((vote) => vote.image_id === cat.id && vote.value === 1 && vote.sub_id == userStore.userId) !=
          null
        cat.thumbsDown =
          this.votes.find((vote) => vote.image_id === cat.id && vote.value === 0 && vote.sub_id == userStore.userId) !=
          null
      })

      this.cats = [...this.cats, ...response.data]
      this.hasMoreData = this.cats.length < response.headers['pagination-count']

      if (this.hasMoreData) {
        this.nextPage = this.nextPage + 1
      }

      this.status = 'successful'
    },

    async getVotes() {
      const limit = 100000
      await axios
        .get<IVote[]>(`https://only-cats.vercel.app/api/cats/votes?limit=${limit}`)
        .then((res) => {
          this.votes = res.data
        })
        .catch(() => {
          this.votes = []
          alert('Unable to get votes')
        })
    },

    async getFavorites() {
      const userStore = useUserStore()
      const limit = 100000
      await axios
        .get<IFavoriteCat[]>(
          `https://only-cats.vercel.app/api/cats/favourites?limit=${limit}&sub_id=${userStore.userId}`
        )
        .then((res) => {
          this.favorites = res.data
        })
        .catch(() => {
          this.favorites = []
          alert('Unable to get favorites')
        })
    },
  },
})
