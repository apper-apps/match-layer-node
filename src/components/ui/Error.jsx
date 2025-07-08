import React from 'react'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  className, 
  title = 'Something went wrong',
  message = 'We encountered an error while loading the data. Please try again.',
  onRetry,
  showRetry = true
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 gradient-text">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <Button 
          variant="primary" 
          onClick={onRetry}
          className="shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="RefreshCw" className="w-5 h-5" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error