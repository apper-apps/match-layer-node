import React from 'react'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ViewToggle = ({ 
  viewMode, 
  onViewChange, 
  className,
  sortBy,
  onSortChange,
  showShowcases,
  onShowcaseToggle
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'area-large', label: 'Area: Large to Small' },
    { value: 'area-small', label: 'Area: Small to Large' }
  ]

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'grid' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onViewChange('grid')}
        >
          <ApperIcon name="Grid3X3" className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onViewChange('list')}
        >
          <ApperIcon name="List" className="w-4 h-4" />
        </Button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Showcase Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={showShowcases ? 'accent' : 'outline'}
          size="sm"
          onClick={onShowcaseToggle}
        >
          <ApperIcon name="Star" className="w-4 h-4" />
          Showcases
        </Button>
      </div>
    </div>
  )
}

export default ViewToggle