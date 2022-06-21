import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface UserState {
  id: string
}

const initialState: UserState = {
  id: '',
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// thunks
export const getOrCreateUserId = createAsyncThunk(
  'user/set_user_id',
  async () => {
    const userIdLocalStorageKey = 'userId'
    let userId = window.localStorage.getItem(userIdLocalStorageKey)
    if (!userId) {
      userId = uuidv4();
      window.localStorage.setItem(userIdLocalStorageKey, userId)
    }

    return { userId }
  }
)

export const userSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrCreateUserId.fulfilled, (state, action) => {
        state.id = action.payload.userId
      })
  },
})

export const { } = userSlice.actions

export default userSlice.reducer
