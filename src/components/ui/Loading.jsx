import React from 'react'
import { cn } from '@/utils/cn'

const Loading = ({ className, variant = 'cards' }) => {
  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="h-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                ))}
              </div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-accent-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  )
}

export default Loading