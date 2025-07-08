import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: null,
  enquiries: [],
  preferences: {
    region: 'Auckland',
    priceRange: [0, 2000000],
    propertyType: 'all',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = !!action.payload
    },
    setEnquiries: (state, action) => {
      state.enquiries = action.payload
    },
    addEnquiry: (state, action) => {
      state.enquiries.push(action.payload)
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.enquiries = []
    },
  },
})

export const {
  setUser,
  setEnquiries,
  addEnquiry,
  updatePreferences,
  logout,
} = userSlice.actions

export default userSlice.reducer