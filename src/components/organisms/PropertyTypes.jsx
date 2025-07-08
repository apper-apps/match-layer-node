import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PropertyTypes = ({ className }) => {
  const propertyTypes = [
    {
      title: 'Land Listings',
      description: 'Premium sections and lots across New Zealand ready for your dream home',
      icon: 'MapPin',
      color: 'from-primary-500 to-primary-600',
      href: '/browse/land',
      features: [
        'Verified land listings',
        'Detailed site information',
        'Council requirements',
        'Utility connections'
      ]
    },
    {
      title: 'House Plans',
      description: 'Curated collection of stunning home designs from leading architects',
      icon: 'Home',
      color: 'from-secondary-500 to-secondary-600',
      href: '/browse/plan',
      features: [
        'Architectural designs',
        'Detailed floor plans',
        'Material specifications',
        'Cost estimates'
      ]
    },
    {
      title: 'Showcase Projects',
      description: 'Real builds by our regional partners showcasing quality craftsmanship',
      icon: 'Star',
      color: 'from-accent-500 to-accent-600',
      href: '/browse/showcase',
      features: [
        'Completed projects',
        'Build testimonials',
        'Photo galleries',
        'Builder stories'
      ]
    }
  ]

  return (
    <section className={cn('py-16 bg-background', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Property Types
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect combination of land, plans, and inspiration for your next build
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propertyTypes.map((type, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="mb-6">
                  <div className={cn(
                    'w-16 h-16 bg-gradient-to-r rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300',
                    type.color
                  )}>
                    <ApperIcon name={type.icon} className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                  {type.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {type.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                      <ApperIcon name="Check" className="w-4 h-4 text-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  as={Link}
                  to={type.href}
                  variant="primary"
                  className="w-full group-hover:shadow-lg"
                >
                  Browse {type.title}
                  <ApperIcon name="ArrowRight" className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertyTypes