import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from '@/store/propertiesSlice'
import userReducer from '@/store/userSlice'
import filtersReducer from '@/store/filtersSlice'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    user: userReducer,
    filters: filtersReducer,
  },
})