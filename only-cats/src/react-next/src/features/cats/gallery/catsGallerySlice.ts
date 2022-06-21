import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../../app/store'
import { getCatsApi } from './api/getCatsAPI'
import { getFavoriteCatsApi } from './api/getFavoriteCatsApi'
import { addFavoriteCatAPI } from './api/addFavoriteCatAPI'
import { removeFavoriteCatAPI } from './api/removeFavoriteCatAPI'
import { IFavoriteCat } from './interfaces/IFavoriteCat'
import { ICat } from './interfaces/ICat'
import { IFavoriteCatAction } from './interfaces/Actions/IFavoriteCatAction'
import { IGetCatsAction } from "./interfaces/Actions/IGetCatsAction"
import { IUpvoteCatAction } from './interfaces/Actions/IUpvoteCatAction'
import { voteCatApi } from './api/voteCatApi'
import { getVotesApi } from './api/getVotesApi'
import { IVote } from './interfaces/IVote'
import { removeVoteApi } from './api/removeVoteApi'

export interface CatsState {
  status: 'idle' | 'loading' | 'failed' | 'complete',
  cats: ICat[],
  hasMoreData: boolean,
  nextPage: number
  favoriteCats: IFavoriteCat[]
  votes: IVote[]
}

const initialState: CatsState = {
  status: 'idle',
  cats: [],
  hasMoreData: true,
  nextPage: 0,
  favoriteCats: [],
  votes: [],
}

export const getCatsAsync = createAsyncThunk(
  'cats/get',
  async (action: IGetCatsAction) => {
    const response = await getCatsApi(action.page)
    return response
  }
)

export const getFavoriteCatsAsync = createAsyncThunk(
  'cats/get_favorites',
  async (userId: string) => {
    const response = await getFavoriteCatsApi(userId)
    return response
  }
)

export const addFavoriteCatAsync = createAsyncThunk(
  'cats/add_favorite',
  async (action: IFavoriteCatAction) => {
    const response = await addFavoriteCatAPI(action.imageId, action.subId)

    if (!response.successful) {
      alert(response.errorMsg)
    }

    return response
  }
)

export const removeFavoriteCatAsync = createAsyncThunk(
  'cats/remove_favorite',
  async (favoriteId: string) => {
    const response = await removeFavoriteCatAPI(favoriteId)

    if (!response.successful) {
      alert(response.errorMsg)
    }

    return response
  }
)

export const getVotesAsync = createAsyncThunk(
  'cats/get_votes',
  async () => {
    const response = await getVotesApi()
    return response
  }
)

export const voteCatAsync = createAsyncThunk(
  'cats/vote',
  async (action: IUpvoteCatAction) => {
    const response = await voteCatApi(action.imageId, action.subId, action.vote)

    if (!response.successful) {
      alert(response.errorMsg)
    }

    return response
  }
)

export const removeVoteAsync = createAsyncThunk(
  'cats/remove_vote',
  async (voteId: string) => {
    const response = await removeVoteApi(voteId)

    if (!response.successful) {
      alert(response.errorMsg)
    }

    return response
  }
)

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatsAsync.pending, (state, action) => {
        if (action.meta.arg.page === 0) {
          // resetting the cats state when calling getCatsAsync for data on first page
          state.cats = initialState.cats
          state.nextPage = initialState.nextPage
          state.hasMoreData = initialState.hasMoreData
        }

        state.status = 'loading'
      })
      .addCase(getCatsAsync.fulfilled, (state, action) => {
        state.status = 'complete'
        state.cats = [...state.cats, ...action.payload.cats]
        state.hasMoreData = state.cats.length < action.payload.paginationCount

        if (state.hasMoreData) {
          state.nextPage = state.nextPage + 1
        }
      })
      .addCase(addFavoriteCatAsync.fulfilled, (state, action) => {
        state.favoriteCats = [...state.favoriteCats, {
          id: action.payload.id,
          image_id: action.payload.imageId,
          sub_id: action.payload.userId
        }]
      })
      .addCase(removeFavoriteCatAsync.fulfilled, (state, action) => {
        const favorites = state.favoriteCats.filter(favoriteCat => favoriteCat.id !== action.payload.favoriteId)
        state.favoriteCats = favorites
      })
      .addCase(getFavoriteCatsAsync.fulfilled, (state, action) => {
        state.favoriteCats = [...action.payload.favorites]
      })
      .addCase(getVotesAsync.fulfilled, (state, action) => {
        state.votes = [...action.payload.votes]
      })
      .addCase(voteCatAsync.fulfilled, (state, action) => {
        const existingVoteSelector = vote => vote.image_id === action.payload.imageId && vote.sub_id === action.payload.userId;
        const voteExists = state.votes.find(existingVoteSelector);
        if (voteExists) {
          state.votes = state.votes.map((vote: IVote) => {
            if (vote.image_id === action.payload.imageId && vote.sub_id === action.payload.userId) {
              // if one already exists just change the value of it
              return {
                ...vote,
                value: action.payload.vote
              }
            }

            return vote
          })
        }
        else {
          state.votes = [...state.votes, {
            id: action.payload.id,
            image_id: action.payload.imageId,
            sub_id: action.payload.userId,
            value: action.payload.vote
          }]
          
        }

      })
      .addCase(removeVoteAsync.fulfilled, (state, action) => {
        state.votes = state.votes.filter(vote => vote.id !== action.payload.voteId)
      })
  },
})

export const { } = catsSlice.actions

// selectors
export const selectCats = (state: AppState) => state.catsGallery.cats
export const selectHasMoreData = (state: AppState) => state.catsGallery.hasMoreData
export const selectNextPage = (state: AppState) => state.catsGallery.nextPage

export default catsSlice.reducer
