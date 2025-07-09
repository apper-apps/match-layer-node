import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeFilters: {
    region: 'Mumbai',
    priceRange: [0, 50000000],
    propertyType: 'all',
    bedrooms: '',
    bathrooms: '',
    garageSpaces: '',
    floorArea: [0, 500],
    landArea: [0, 5000],
  },
  viewMode: 'grid',
  sortBy: 'newest',
  showShowcases: true,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload
      state.activeFilters[key] = value
    },
    updateFilters: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload }
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setShowShowcases: (state, action) => {
      state.showShowcases = action.payload
    },
resetFilters: (state) => {
      state.activeFilters = initialState.activeFilters
    },
  },
})

export const {
  updateFilter,
  updateFilters,
  setViewMode,
  setSortBy,
  setShowShowcases,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer