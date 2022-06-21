import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import catsUploadReducer from '../features/cats/upload/catsUploadSlice'
import catsGalleryReducer from '../features/cats/gallery/catsGallerySlice'
import userReducer from '../features/user/userSlice'

export function makeStore() {
  return configureStore({
    reducer: { catsUpload: catsUploadReducer, catsGallery: catsGalleryReducer, user: userReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
