import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { landService } from '@/services/api/landService'
import { conceptPlanService } from '@/services/api/conceptPlanService'
import { showcaseService } from '@/services/api/showcaseService'
import { setCurrentProperty, setLoading, setError, toggleSavedProperty } from '@/store/propertiesSlice'
import ApperIcon from '@/components/ApperIcon'

const PropertyDetail = () => {
  const { type, id } = useParams()
  const dispatch = useDispatch()
  const { currentProperty, loading, error, savedProperties } = useSelector(state => state.properties)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)

  useEffect(() => {
    loadProperty()
  }, [type, id])

  const loadProperty = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      let property = null
      const propertyId = parseInt(id)

      if (type === 'land') {
        property = await landService.getById(propertyId)
      } else if (type === 'plan') {
        property = await conceptPlanService.getById(propertyId)
      } else if (type === 'showcase') {
        property = await showcaseService.getById(propertyId)
      }

      if (!property) {
        throw new Error('Property not found')
      }

      dispatch(setCurrentProperty(property))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleSave = () => {
    dispatch(toggleSavedProperty(parseInt(id)))
  }

  const isSaved = savedProperties.some(saved => saved.Id === parseInt(id))

const formatPrice = (price) => {
    if (!price) return 'Price on enquiry'
    if (price >= 1000000) {
      return `₹${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}K`
    }
    return `₹${price}`
  }

  const getPropertyTypeInfo = (property) => {
    if (type === 'land') {
      return {
        badge: 'Land',
        variant: 'primary',
        specs: [
          { label: 'Land Area', value: `${property.area} sqm`, icon: 'MapPin' },
          { label: 'Location', value: property.location, icon: 'Navigation' },
          { label: 'Status', value: property.status || 'Available', icon: 'CheckCircle' }
        ]
      }
    } else if (type === 'plan') {
      return {
        badge: 'House Plan',
        variant: 'secondary',
        specs: [
          { label: 'Floor Area', value: `${property.floorArea} sqm`, icon: 'Home' },
          { label: 'Bedrooms', value: property.bedrooms, icon: 'Bed' },
          { label: 'Bathrooms', value: property.bathrooms, icon: 'Bath' },
          { label: 'Garage', value: `${property.garageSpaces} spaces`, icon: 'Car' }
        ]
      }
    } else if (type === 'showcase') {
      return {
        badge: 'Showcase',
        variant: 'showcase',
        specs: [
          { label: 'Location', value: property.location, icon: 'MapPin' },
          { label: 'Completed', value: new Date(property.completionDate).getFullYear(), icon: 'Calendar' },
          { label: 'Builder', value: property.builderId, icon: 'Hammer' }
        ]
      }
    }
    return { badge: 'Property', variant: 'default', specs: [] }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading variant="detail" />
        </div>
      </div>
    )
  }

  if (error || !currentProperty) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error 
            title="Property not found"
            message={error || 'The property you are looking for does not exist or has been removed.'}
            onRetry={loadProperty}
          />
        </div>
      </div>
    )
  }

  const typeInfo = getPropertyTypeInfo(currentProperty)
  const images = currentProperty.images || []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
            <Link to="/browse" className="hover:text-primary-600">Browse</Link>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
            <span className="text-gray-900">{currentProperty.title || currentProperty.name}</span>
          </div>
        </nav>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={currentProperty.title || currentProperty.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ApperIcon name="Image" className="w-24 h-24 text-gray-400" />
              </div>
            )}
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ApperIcon name="ChevronLeft" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ApperIcon name="ChevronRight" className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                    index === currentImageIndex
                      ? 'border-primary-500 ring-2 ring-primary-500/20'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <img
                    src={images[index]}
                    alt={`${currentProperty.title || currentProperty.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant={typeInfo.variant} className="mb-2">
                    {typeInfo.badge}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {currentProperty.title || currentProperty.name}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {currentProperty.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {formatPrice(currentProperty.price || currentProperty.estimatedPrice)}
                  </div>
                  {type === 'plan' && (
                    <p className="text-sm text-gray-500">Estimated build cost</p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Specs */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typeInfo.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name={spec.icon} className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{spec.label}</p>
                        <p className="font-medium text-gray-900">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentProperty.description || currentProperty.buildStory || 'No description available.'}
                </p>
                
                {currentProperty.testimonial && (
                  <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
                    <h4 className="font-semibold text-accent-900 mb-2">Client Testimonial</h4>
                    <p className="text-accent-800 italic">"{currentProperty.testimonial}"</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this property?</h3>
                
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setShowEnquiryForm(true)}
                  >
                    <ApperIcon name="MessageSquare" className="w-5 h-5" />
                    Make Enquiry
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={handleSave}
                  >
                    <ApperIcon 
                      name={isSaved ? 'Heart' : 'Heart'} 
                      className={cn('w-5 h-5', isSaved && 'fill-current')} 
                    />
                    {isSaved ? 'Saved' : 'Save Property'}
                  </Button>
                  
                  {type === 'land' && (
                    <Button
                      as={Link}
                      to={`/match-creator?land=${currentProperty.Id}`}
                      variant="accent"
                      size="lg"
                      className="w-full"
                    >
                      <ApperIcon name="Plus" className="w-5 h-5" />
                      Match with Plan
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Phone" className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">0800 MATCH NZ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Mail" className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">hello@match.nz</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="MapPin" className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">New Zealand Wide</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail