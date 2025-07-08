import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'

const HeroSection = ({ className, onSearch }) => {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Perfect
            <br />
            <span className="bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
              House & Land Match
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Connect premium New Zealand land listings with stunning home concept plans and regional builders. 
            Turn your property dreams into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              as={Link}
              to="/browse"
              variant="accent"
              size="lg"
              className="shadow-xl hover:shadow-2xl"
            >
              <ApperIcon name="Search" className="w-6 h-6" />
              Explore Properties
            </Button>
            
            <Button 
              as={Link}
              to="/match-creator"
              variant="secondary"
              size="lg"
              className="shadow-xl hover:shadow-2xl"
            >
              <ApperIcon name="Plus" className="w-6 h-6" />
              Create Match
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </section>
  )
}

export default HeroSection