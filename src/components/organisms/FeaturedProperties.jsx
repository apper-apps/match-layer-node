import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import { landService } from '@/services/api/landService'
import { conceptPlanService } from '@/services/api/conceptPlanService'
import { showcaseService } from '@/services/api/showcaseService'
import { setLandListings, setConceptPlans, setShowcaseProjects, setLoading, setError, toggleSavedProperty } from '@/store/propertiesSlice'

const FeaturedProperties = ({ className }) => {
  const dispatch = useDispatch()
  const { landListings, conceptPlans, showcaseProjects, loading, error, savedProperties } = useSelector(state => state.properties)
  const [featuredProperties, setFeaturedProperties] = useState([])

  useEffect(() => {
    loadFeaturedProperties()
  }, [])

  useEffect(() => {
    // Combine and shuffle properties for featured section
    const allProperties = [
      ...landListings.slice(0, 2),
      ...conceptPlans.slice(0, 2),
      ...showcaseProjects.slice(0, 2)
    ]
    setFeaturedProperties(allProperties.sort(() => Math.random() - 0.5))
  }, [landListings, conceptPlans, showcaseProjects])

  const loadFeaturedProperties = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const [landData, planData, showcaseData] = await Promise.all([
        landService.getAll(),
        conceptPlanService.getAll(),
        showcaseService.getAll()
      ])

      dispatch(setLandListings(landData))
      dispatch(setConceptPlans(planData))
      dispatch(setShowcaseProjects(showcaseData))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleSave = (propertyId) => {
    dispatch(toggleSavedProperty(propertyId))
  }

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover handpicked properties, plans, and showcase projects across New Zealand
          </p>
        </div>

        <PropertyGrid
          properties={featuredProperties}
          loading={loading}
          error={error}
          onRetry={loadFeaturedProperties}
          onSave={handleSave}
          savedProperties={savedProperties}
          viewMode="grid"
        />
      </div>
    </section>
  )
}

export default FeaturedProperties