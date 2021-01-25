import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName:null,
    lastName:null,
    email:null
  },
  reducers: {
    setEmail: (state,payload) => {
      state.email = payload.payload;
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { setEmail, decremented } = userSlice.actions
export const userReducer = userSlice.reducer;