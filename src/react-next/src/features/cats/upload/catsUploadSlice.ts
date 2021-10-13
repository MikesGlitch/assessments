import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppState } from '../../../app/store'
import { getCatsAsync } from '../gallery/catsGallerySlice'
import { uploadCat as uploadCatApi } from './api/uploadCatAPI'
import { IUploadCatAction } from './interfaces/IUploadCatAction'

export interface CatsState {
  status: 'idle' | 'loading' | 'failed' | 'complete',
}

const initialState: CatsState = {
  status: 'idle',
}

export const uploadCatAsync = createAsyncThunk(
  'cats/upload',
  async (action: IUploadCatAction, { dispatch }) => {
    const response = await uploadCatApi(action.fileToUpload)
    if(response.successful) {
      dispatch(getCatsAsync({ page: 0 }))
      action.router.push('/')
    } else {
      alert(response.errorMsg)
    }
  }
)

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCatAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(uploadCatAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const { } = catsSlice.actions

export default catsSlice.reducer

export const selectUserId = (state: AppState) => state.user.id
