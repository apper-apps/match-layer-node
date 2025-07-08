import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import FilterSection from '@/components/molecules/FilterSection'
import ViewToggle from '@/components/molecules/ViewToggle'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import { landService } from '@/services/api/landService'
import { conceptPlanService } from '@/services/api/conceptPlanService'
import { showcaseService } from '@/services/api/showcaseService'
import { setSearchResults, setLoading, setError, toggleSavedProperty } from '@/store/propertiesSlice'
import { updateFilter, setViewMode, setSortBy, setShowShowcases } from '@/store/filtersSlice'

const Browse = () => {
  const { type } = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { searchResults, loading, error, savedProperties } = useSelector(state => state.properties)
  const { activeFilters, viewMode, sortBy, showShowcases } = useSelector(state => state.filters)
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false)

  useEffect(() => {
    // Initialize filters from URL params
    const region = searchParams.get('region') || activeFilters.region
    const q = searchParams.get('q') || ''
    
    if (region !== activeFilters.region) {
      dispatch(updateFilter({ key: 'region', value: region }))
    }
    
    // Set property type filter based on route
    if (type) {
      dispatch(updateFilter({ key: 'propertyType', value: type }))
    }
    
    loadProperties()
  }, [type, searchParams, activeFilters])

  const loadProperties = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      let allProperties = []

      // Load based on property type filter
      if (!type || type === 'all' || activeFilters.propertyType === 'all') {
        const [landData, planData, showcaseData] = await Promise.all([
          landService.getAll(),
          conceptPlanService.getAll(),
          showcaseService.getAll()
        ])
        allProperties = [...landData, ...planData, ...showcaseData]
      } else if (type === 'land' || activeFilters.propertyType === 'land') {
        allProperties = await landService.getAll()
      } else if (type === 'plan' || activeFilters.propertyType === 'plan') {
        allProperties = await conceptPlanService.getAll()
      } else if (type === 'showcase' || activeFilters.propertyType === 'showcase') {
        allProperties = await showcaseService.getAll()
      }

      // Apply filters
      let filteredProperties = allProperties.filter(property => {
        // Region filter
        if (activeFilters.region && property.location && !property.location.includes(activeFilters.region)) {
          return false
        }

        // Price range filter
        if (property.price && (property.price < activeFilters.priceRange[0] || property.price > activeFilters.priceRange[1])) {
          return false
        }

        // Bedroom filter
        if (activeFilters.bedrooms && property.bedrooms && property.bedrooms < parseInt(activeFilters.bedrooms)) {
          return false
        }

        // Bathroom filter
        if (activeFilters.bathrooms && property.bathrooms && property.bathrooms < parseInt(activeFilters.bathrooms)) {
          return false
        }

        // Garage filter
        if (activeFilters.garageSpaces && property.garageSpaces && property.garageSpaces < parseInt(activeFilters.garageSpaces)) {
          return false
        }

        // Floor area filter
        if (property.floorArea && (property.floorArea < activeFilters.floorArea[0] || property.floorArea > activeFilters.floorArea[1])) {
          return false
        }

        // Land area filter
        if (property.area && (property.area < activeFilters.landArea[0] || property.area > activeFilters.landArea[1])) {
          return false
        }

        return true
      })

      // Sort properties
      filteredProperties.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return (a.price || 0) - (b.price || 0)
          case 'price-high':
            return (b.price || 0) - (a.price || 0)
          case 'area-large':
            return (b.area || b.floorArea || 0) - (a.area || a.floorArea || 0)
          case 'area-small':
            return (a.area || a.floorArea || 0) - (b.area || b.floorArea || 0)
          case 'oldest':
            return new Date(a.createdAt || '2024-01-01') - new Date(b.createdAt || '2024-01-01')
          case 'newest':
          default:
            return new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01')
        }
      })

      dispatch(setSearchResults(filteredProperties))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }))
  }

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode))
  }

  const handleSortChange = (sort) => {
    dispatch(setSortBy(sort))
  }

  const handleShowcaseToggle = () => {
    dispatch(setShowShowcases(!showShowcases))
  }

  const handleSave = (propertyId) => {
    dispatch(toggleSavedProperty(propertyId))
  }

  const handleResetFilters = () => {
    // Reset to default filters but keep current region
    dispatch(updateFilter({ key: 'priceRange', value: [0, 2000000] }))
    dispatch(updateFilter({ key: 'propertyType', value: 'all' }))
    dispatch(updateFilter({ key: 'bedrooms', value: '' }))
    dispatch(updateFilter({ key: 'bathrooms', value: '' }))
    dispatch(updateFilter({ key: 'garageSpaces', value: '' }))
    dispatch(updateFilter({ key: 'floorArea', value: [0, 500] }))
    dispatch(updateFilter({ key: 'landArea', value: [0, 5000] }))
  }

  const getPageTitle = () => {
    if (type === 'land') return 'Land Listings'
    if (type === 'plan') return 'House Plans'
    if (type === 'showcase') return 'Showcase Projects'
    return 'Browse Properties'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-gray-600">
            {searchResults.length} properties found in {activeFilters.region}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <FilterSection
              filters={activeFilters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              isCollapsed={isFilterCollapsed}
              onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <ViewToggle
                viewMode={viewMode}
                onViewChange={handleViewModeChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                showShowcases={showShowcases}
                onShowcaseToggle={handleShowcaseToggle}
              />
            </div>

            <PropertyGrid
              properties={searchResults}
              loading={loading}
              error={error}
              onRetry={loadProperties}
              viewMode={viewMode}
              onSave={handleSave}
              savedProperties={savedProperties}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse