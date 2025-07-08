import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Discover Properties',
      description: 'Browse premium land listings, house concept plans, and showcase projects across New Zealand',
      icon: 'Search',
      color: 'from-primary-500 to-primary-600',
      features: [
        'Filter by location, budget, and requirements',
        'View detailed property information',
        'Save properties to your shortlist',
        'Compare different options'
      ]
    },
    {
      number: 2,
      title: 'Create Matches',
      description: 'Use our matching engine to combine land with house plans and visualize your perfect property',
      icon: 'Layers',
      color: 'from-secondary-500 to-secondary-600',
      features: [
        'AI-powered matching suggestions',
        'Visual combination preview',
        'Cost estimation calculator',
        'Save and share your matches'
      ]
    },
    {
      number: 3,
      title: 'Connect with Builders',
      description: 'Get connected with trusted regional builders who can bring your vision to life',
      icon: 'Hammer',
      color: 'from-accent-500 to-accent-600',
      features: [
        'Vetted regional builder network',
        'Direct enquiry system',
        'Quality guarantee',
        'Project management support'
      ]
    },
    {
      number: 4,
      title: 'Build Your Dream',
      description: 'Work with your chosen builder to design, quote, and construct your perfect home',
      icon: 'Home',
      color: 'from-green-500 to-green-600',
      features: [
        'Custom design development',
        'Detailed project quotes',
        'Construction timeline',
        'Quality completion'
      ]
    }
  ]

  const propertyTypes = [
    {
      title: 'Land Listings',
      description: 'Premium sections and lots from verified landowners and agents',
      icon: 'MapPin',
      color: 'bg-primary-500',
      benefits: [
        'Verified ownership',
        'Detailed site information',
        'Council requirements',
        'Utility connections'
      ]
    },
    {
      title: 'House Concept Plans',
      description: 'Curated collection of stunning home designs from leading architects',
      icon: 'FileText',
      color: 'bg-secondary-500',
      benefits: [
        'Architectural designs',
        'Detailed specifications',
        'Material guides',
        'Cost estimates'
      ]
    },
    {
      title: 'Showcase Projects',
      description: 'Real completed builds from our regional builder partners',
      icon: 'Star',
      color: 'bg-accent-500',
      benefits: [
        'Completed projects',
        'Client testimonials',
        'Photo galleries',
        'Build stories'
      ]
    }
  ]

  const faqs = [
    {
      question: 'How does the matching process work?',
      answer: 'Our matching engine analyzes land characteristics, house plan requirements, and your preferences to suggest compatible combinations. You can also manually browse and create matches.'
    },
    {
      question: 'Are the builders vetted?',
      answer: 'Yes, all builders in our network are thoroughly vetted for quality, reliability, and customer satisfaction. We maintain one preferred builder partner per region.'
    },
    {
      question: 'What are the costs involved?',
      answer: 'Using Match.nz is completely free. You only pay for the land and construction costs directly to the landowner and builder respectively.'
    },
    {
      question: 'How accurate are the price estimates?',
      answer: 'Land prices are current as provided by owners/agents. House plan prices are estimates only. Final accurate pricing comes through builder consultation.'
    },
    {
      question: 'Can I customize house plans?',
      answer: 'Yes! House plans serve as starting points. Our builder partners can modify designs to meet your specific needs and preferences.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Match.nz Works
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Your complete guide to finding the perfect house and land combination 
              and connecting with trusted builders across New Zealand
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Four Simple Steps to Your Dream Home
            </h2>
            <p className="text-xl text-gray-600">
              From discovery to completion, we guide you through every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="mb-6">
                    <div className={cn(
                      'w-16 h-16 mx-auto bg-gradient-to-r rounded-full flex items-center justify-center shadow-lg mb-4',
                      step.color
                    )}>
                      <ApperIcon name={step.icon} className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      Step {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <ApperIcon name="Check" className="w-4 h-4 text-primary-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button as={Link} to="/browse" variant="primary" size="lg">
              <ApperIcon name="ArrowRight" className="w-5 h-5" />
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Three Types of Properties
            </h2>
            <p className="text-xl text-gray-600">
              Explore land, plans, and inspiration all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="mb-6">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center shadow-lg mb-4',
                      type.color
                    )}>
                      <ApperIcon name={type.icon} className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {type.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <ApperIcon name="Check" className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Match.nz?
            </h2>
            <p className="text-xl text-gray-600">
              The complete solution for your property journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Shield" className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Network</h3>
                <p className="text-gray-600">Vetted builders and verified properties</p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Zap" className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
                <p className="text-gray-600">AI-powered property combinations</p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Users" className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600">Guidance throughout your journey</p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="DollarSign" className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">No hidden fees or surprises</p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Clock" className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h3>
                <p className="text-gray-600">Find everything in one place</p>
              </div>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Heart" className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Focus</h3>
                <p className="text-gray-600">Premium properties and builders</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Match.nz
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start exploring land, plans, and builders today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as={Link} to="/browse" variant="accent" size="lg">
              <ApperIcon name="Search" className="w-5 h-5" />
              Browse Properties
            </Button>
            <Button as={Link} to="/custom-build" variant="secondary" size="lg">
              <ApperIcon name="Hammer" className="w-5 h-5" />
              Custom Build
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks