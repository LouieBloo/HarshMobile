import { userReducer } from './userStore';
import { createSlice, configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})