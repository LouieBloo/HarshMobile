import { createSlice, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: null,
    name: null,
    email: null,
    location: null,
    points: {
      current: 0,
      total: 0
    },
    ageRange: {
      max: 100,
      min: 18
    },
    bio: null,
    birthday: "2000-01-01T00:00:00.000Z",
    bodyType: null,
    bodyTypePreference: [
      "Athletic",
      "Thin",
      "Average",
      "Plus",
      "Very Plus"
    ],
    gender: "Female",
    preference: "Male",
    range: 150
  },
  reducers: {
    login: (state, payload) => {
      state._id = payload.payload._id;
    },
    setEmail: (state, payload) => {
      state.email = payload.payload;
    },
    
    welcome: (state, payload) => {
      state._id = payload.payload._id;
      state.location = payload.payload.location;
      state.name = payload.payload.name;
      state.points = payload.payload.points;
    },
    setPreferences: (state, payload) => {
      for (var key in payload) {
        state[key] = payload[key];
      }
    },
  }
})

export const { setEmail, login, welcome, setPreferences } = userSlice.actions
export const userReducer = userSlice.reducer;