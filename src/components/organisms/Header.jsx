import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import NavigationItem from '@/components/molecules/NavigationItem'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isLoggedIn } = useSelector(state => state.user)
  const { savedProperties } = useSelector(state => state.properties)

  const navigation = [
    { to: '/', label: 'Home', icon: 'Home' },
    { to: '/browse', label: 'Browse', icon: 'Search' },
    { to: '/browse/land', label: 'Land', icon: 'MapPin' },
    { to: '/browse/plan', label: 'House Plans', icon: 'Home' },
    { to: '/browse/showcase', label: 'Showcases', icon: 'Star' },
    { to: '/custom-build', label: 'Custom Build', icon: 'Hammer' },
    { to: '/how-it-works', label: 'How It Works', icon: 'HelpCircle' },
  ]

  const userNavigation = [
    { to: '/dashboard', label: 'Dashboard', icon: 'User' },
    { to: '/dashboard', label: 'Saved', icon: 'Heart', badge: savedProperties.length },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
{/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <ApperIcon name="Home" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Indian match</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                  location.pathname === item.to
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                )}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-2">
                {userNavigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 relative',
                      location.pathname === item.to
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    )}
                  >
                    <ApperIcon name={item.icon} className="w-4 h-4" />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? 'X' : 'Menu'} className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={location.pathname === item.to}
              />
            ))}
            
            {isLoggedIn ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                {userNavigation.map((item) => (
                  <NavigationItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={location.pathname === item.to}
                  />
                ))}
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
                <Button variant="primary" size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header