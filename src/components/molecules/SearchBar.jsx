import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ className, onSearch, compact = false }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('Auckland')
  const [priceRange, setPriceRange] = useState('any')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.({ searchTerm, location, priceRange })
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <div className="flex-1">
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary">
          <ApperIcon name="Search" className="w-5 h-5" />
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('bg-white rounded-2xl shadow-xl p-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Properties
          </label>
          <Input
            placeholder="Enter keywords, location, or property type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-14"
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
        
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex-1 flex items-end">
            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className="w-full h-14"
            >
              <ApperIcon name="Search" className="w-5 h-5" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchBar