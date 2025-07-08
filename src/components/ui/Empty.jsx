import React from 'react'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  className, 
  title = 'No results found',
  message = 'Try adjusting your search filters or explore different property types.',
  actionLabel = 'Browse Properties',
  onAction,
  icon = 'Search'
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-xl">
          <ApperIcon name={icon} className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 gradient-text">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onAction && (
        <Button 
          variant="primary" 
          onClick={onAction}
          className="shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="ArrowRight" className="w-5 h-5" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty