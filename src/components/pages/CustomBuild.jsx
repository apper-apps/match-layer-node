import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const CustomBuild = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: 'Auckland',
    projectType: 'new-build',
    budget: '',
    timeline: '',
    landStatus: 'have-land',
    bedrooms: '',
    bathrooms: '',
    garageSpaces: '',
    specialRequirements: '',
    message: ''
  })

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Custom build enquiry submitted successfully!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        region: 'Auckland',
        projectType: 'new-build',
        budget: '',
        timeline: '',
        landStatus: 'have-land',
        bedrooms: '',
        bathrooms: '',
        garageSpaces: '',
        specialRequirements: '',
        message: ''
      })
    } catch (err) {
      toast.error('Failed to submit enquiry')
    }
  }

  const budgetRanges = [
    { value: '300-500', label: '$300K - $500K' },
    { value: '500-750', label: '$500K - $750K' },
    { value: '750-1000', label: '$750K - $1M' },
    { value: '1000-1500', label: '$1M - $1.5M' },
    { value: '1500+', label: '$1.5M+' }
  ]

  const timelineOptions = [
    { value: '6-months', label: 'Within 6 months' },
    { value: '12-months', label: 'Within 12 months' },
    { value: '18-months', label: 'Within 18 months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ]

  const regions = [
    'Auckland',
    'Wellington',
    'Christchurch',
    'Hamilton',
    'Tauranga',
    'Dunedin',
    'Palmerston North',
    'Nelson',
    'Rotorua',
    'Whangarei'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Custom Build
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Your Dream Home
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Work with our network of trusted regional builders to create a completely custom home 
            tailored to your vision, lifestyle, and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Process Steps */}
          <div className="lg:col-span-1">
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Submit Enquiry</h4>
                      <p className="text-sm text-gray-600">Tell us about your project requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Builder Match</h4>
                      <p className="text-sm text-gray-600">We connect you with regional builders</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Design & Quote</h4>
                      <p className="text-sm text-gray-600">Receive custom designs and pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Build Your Home</h4>
                      <p className="text-sm text-gray-600">Start construction with your chosen builder</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Custom Build?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Check" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Completely tailored to your needs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Check" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Work with trusted regional builders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Check" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Quality materials and craftsmanship</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Check" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Full project management support</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Start Your Custom Build Journey
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region
                      </label>
                      <Select
                        value={formData.region}
                        onChange={(e) => handleInputChange('region', e.target.value)}
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Type
                        </label>
                        <Select
                          value={formData.projectType}
                          onChange={(e) => handleInputChange('projectType', e.target.value)}
                        >
                          <option value="new-build">New Build</option>
                          <option value="renovation">Major Renovation</option>
                          <option value="extension">Extension/Addition</option>
                          <option value="rebuild">Rebuild</option>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <Select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeline
                        </label>
                        <Select
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                        >
                          <option value="">Select timeline</option>
                          {timelineOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Land Status
                        </label>
                        <Select
                          value={formData.landStatus}
                          onChange={(e) => handleInputChange('landStatus', e.target.value)}
                        >
                          <option value="have-land">I have land</option>
                          <option value="need-land">I need land</option>
                          <option value="looking-both">Looking for both</option>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Home Requirements */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Requirements</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bedrooms
                        </label>
                        <Select
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5+</option>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bathrooms
                        </label>
                        <Select
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4+</option>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Garage Spaces
                        </label>
                        <Select
                          value={formData.garageSpaces}
                          onChange={(e) => handleInputChange('garageSpaces', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="0">None</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4+</option>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <Input
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      placeholder="e.g. Accessibility features, eco-friendly materials, etc."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      placeholder="Tell us more about your project vision..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    <ApperIcon name="Send" className="w-5 h-5" />
                    Submit Custom Build Enquiry
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomBuild