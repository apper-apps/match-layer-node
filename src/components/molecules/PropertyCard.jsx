import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PropertyCard = ({ property, type, className, onSave, isSaved = false }) => {
const formatPrice = (price) => {
    if (price >= 1000000) {
      return `₹${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}K`
    }
    return `₹${price}`
  }

  const getTypeInfo = () => {
    switch (type) {
      case 'land':
        return {
          badge: 'Land',
          variant: 'primary',
          price: property.price,
          subtitle: `${property.area} sqm • ${property.location}`,
          specs: []
        }
      case 'plan':
        return {
          badge: 'House Plan',
          variant: 'secondary',
          price: property.estimatedPrice,
          subtitle: `${property.floorArea} sqm floor area`,
          specs: [
            { icon: 'Bed', value: property.bedrooms, label: 'bed' },
            { icon: 'Bath', value: property.bathrooms, label: 'bath' },
            { icon: 'Car', value: property.garageSpaces, label: 'garage' }
          ]
        }
      case 'showcase':
        return {
          badge: 'Showcase',
          variant: 'showcase',
          price: null,
          subtitle: `${property.location} • Completed ${new Date(property.completionDate).getFullYear()}`,
          specs: []
        }
      default:
        return {
          badge: 'Property',
          variant: 'default',
          price: property.price,
          subtitle: property.location,
          specs: []
        }
    }
  }

  const typeInfo = getTypeInfo()

  return (
    <Card className={cn('group overflow-hidden hover:shadow-2xl transition-all duration-300', className)}>
      <div className="relative">
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title || property.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <ApperIcon name="Image" className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="absolute top-4 left-4">
          <Badge variant={typeInfo.variant} size="sm">
            {typeInfo.badge}
          </Badge>
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault()
            onSave?.(property.Id)
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
        >
          <ApperIcon 
            name={isSaved ? 'Heart' : 'Heart'} 
            className={cn('w-4 h-4', isSaved ? 'text-red-500 fill-current' : 'text-gray-600')}
          />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {property.title || property.name}
          </h3>
          {typeInfo.price && (
            <span className="text-xl font-bold gradient-text">
              {formatPrice(typeInfo.price)}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {typeInfo.subtitle}
        </p>
        
        {typeInfo.specs.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            {typeInfo.specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-1 text-sm text-gray-600">
                <ApperIcon name={spec.icon} className="w-4 h-4" />
                <span>{spec.value} {spec.label}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button
            as={Link}
            to={`/property/${type}/${property.Id}`}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          
          {type === 'land' && (
            <Button
              as={Link}
              to={`/match-creator?land=${property.Id}`}
              variant="accent"
              size="sm"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard