import React from 'react'
import { cn } from '@/utils/cn'
import PropertyCard from '@/components/molecules/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onRetry, 
  className,
  viewMode = 'grid',
  onSave,
  savedProperties = []
}) => {
  if (loading) {
    return <Loading variant="cards" className={className} />
  }

  if (error) {
    return (
      <Error 
        title="Failed to load properties"
        message={error}
        onRetry={onRetry}
        className={className}
      />
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty
        title="No properties found"
        message="Try adjusting your search filters or explore different property types to find your perfect match."
        actionLabel="View All Properties"
        onAction={() => window.location.href = '/browse'}
        className={className}
      />
    )
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'flex flex-col gap-4'

  return (
    <div className={cn(gridClasses, className)}>
      {properties.map((property) => {
        const type = property.area ? 'land' : property.floorArea ? 'plan' : 'showcase'
        const isSaved = savedProperties.some(saved => saved.Id === property.Id)
        
        return (
          <PropertyCard
            key={property.Id}
            property={property}
            type={type}
            onSave={onSave}
            isSaved={isSaved}
            className={viewMode === 'list' ? 'max-w-none' : ''}
          />
        )
      })}
    </div>
  )
}

export default PropertyGrid