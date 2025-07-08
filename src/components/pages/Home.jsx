import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import PropertyTypes from '@/components/organisms/PropertyTypes'
import FeaturedProperties from '@/components/organisms/FeaturedProperties'

const Home = () => {
  const navigate = useNavigate()

  const handleSearch = (searchData) => {
    const params = new URLSearchParams()
    if (searchData.searchTerm) params.append('q', searchData.searchTerm)
    if (searchData.location) params.append('region', searchData.location)
    if (searchData.priceRange) params.append('price', searchData.priceRange)
    
    navigate(`/browse?${params.toString()}`)
  }

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <PropertyTypes />
      <FeaturedProperties />
    </div>
  )
}

export default Home