import React from 'react'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import Input from '@/components/atoms/Input'
import Slider from '@/components/atoms/Slider'
import ApperIcon from '@/components/ApperIcon'

const FilterSection = ({ 
  className, 
  filters, 
  onFilterChange, 
  onReset,
  isCollapsed = false,
  onToggle
}) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price}`
  }

  const priceRanges = [
    { label: 'Any Price', value: [0, 2000000] },
    { label: 'Under $500K', value: [0, 500000] },
    { label: '$500K - $1M', value: [500000, 1000000] },
    { label: '$1M - $1.5M', value: [1000000, 1500000] },
    { label: '$1.5M+', value: [1500000, 2000000] }
  ]

  return (
    <div className={cn('bg-white rounded-xl shadow-lg', className)}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-500 hover:text-primary-500"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              <ApperIcon name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className={cn('p-6 space-y-6', isCollapsed && 'hidden lg:block')}>
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Region
          </label>
          <Select
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
          >
            <option value="Auckland">Auckland</option>
            <option value="Wellington">Wellington</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Tauranga">Tauranga</option>
            <option value="Dunedin">Dunedin</option>
            <option value="Palmerston North">Palmerston North</option>
            <option value="Nelson">Nelson</option>
            <option value="Rotorua">Rotorua</option>
            <option value="Whangarei">Whangarei</option>
          </Select>
        </div>

        {/* Property Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Property Type
          </label>
          <Select
            value={filters.propertyType}
            onChange={(e) => onFilterChange('propertyType', e.target.value)}
          >
            <option value="all">All Properties</option>
            <option value="land">Land Only</option>
            <option value="plan">House Plans</option>
            <option value="showcase">Showcases</option>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
            <div className="space-y-2">
              <Slider
                value={filters.priceRange[0]}
                min={0}
                max={2000000}
                step={50000}
                onChange={(e) => onFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
              />
              <Slider
                value={filters.priceRange[1]}
                min={0}
                max={2000000}
                step={50000}
                onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              />
            </div>
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bedrooms
          </label>
          <Select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange('bedrooms', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </Select>
        </div>

        {/* Bathrooms Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bathrooms
          </label>
          <Select
            value={filters.bathrooms}
            onChange={(e) => onFilterChange('bathrooms', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </Select>
        </div>

        {/* Garage Spaces Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Garage Spaces
          </label>
          <Select
            value={filters.garageSpaces}
            onChange={(e) => onFilterChange('garageSpaces', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </Select>
        </div>

        {/* Floor Area Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Floor Area (sqm)
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filters.floorArea[0]} sqm</span>
              <span>{filters.floorArea[1]} sqm</span>
            </div>
            <Slider
              value={filters.floorArea[1]}
              min={0}
              max={500}
              step={10}
              onChange={(e) => onFilterChange('floorArea', [filters.floorArea[0], parseInt(e.target.value)])}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection