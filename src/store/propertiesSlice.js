import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  landListings: [],
  conceptPlans: [],
  showcaseProjects: [],
  matches: [],
  savedProperties: [],
  loading: false,
  error: null,
  searchResults: [],
  currentProperty: null,
}

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setLandListings: (state, action) => {
      state.landListings = action.payload
    },
    setConceptPlans: (state, action) => {
      state.conceptPlans = action.payload
    },
    setShowcaseProjects: (state, action) => {
      state.showcaseProjects = action.payload
    },
    setMatches: (state, action) => {
      state.matches = action.payload
    },
    setSavedProperties: (state, action) => {
      state.savedProperties = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload
    },
    addMatch: (state, action) => {
      state.matches.push(action.payload)
    },
    removeMatch: (state, action) => {
      state.matches = state.matches.filter(match => match.Id !== action.payload)
    },
    toggleSavedProperty: (state, action) => {
      const propertyId = action.payload
      const index = state.savedProperties.findIndex(p => p.Id === propertyId)
      if (index >= 0) {
        state.savedProperties.splice(index, 1)
      } else {
        state.savedProperties.push({ Id: propertyId, type: 'property' })
      }
    },
  },
})

export const {
  setLoading,
  setError,
  setLandListings,
  setConceptPlans,
  setShowcaseProjects,
  setMatches,
  setSavedProperties,
  setSearchResults,
  setCurrentProperty,
  addMatch,
  removeMatch,
  toggleSavedProperty,
} = propertiesSlice.actions

export default propertiesSlice.reducer