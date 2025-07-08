import React from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const NavigationItem = ({ 
  to, 
  icon, 
  label, 
  className, 
  onClick,
  badge,
  isActive = false 
}) => {
  const content = (
    <div className={cn(
      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
      isActive 
        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50',
      className
    )}>
      <ApperIcon 
        name={icon} 
        className={cn(
          'w-5 h-5 transition-colors duration-200',
          isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'
        )}
      />
      <span className="font-medium">{label}</span>
      {badge && (
        <span className={cn(
          'ml-auto px-2 py-1 text-xs rounded-full',
          isActive 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600'
        )}>
          {badge}
        </span>
      )}
    </div>
  )

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => cn(
          'block',
          isActive && 'bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg'
        )}
        onClick={onClick}
      >
        {({ isActive }) => (
          <div className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
            isActive 
              ? 'text-white shadow-lg' 
              : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
          )}>
            <ApperIcon 
              name={icon} 
              className={cn(
                'w-5 h-5 transition-colors duration-200',
                isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'
              )}
            />
            <span className="font-medium">{label}</span>
            {badge && (
              <span className={cn(
                'ml-auto px-2 py-1 text-xs rounded-full',
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600'
              )}>
                {badge}
              </span>
            )}
          </div>
        )}
      </NavLink>
    )
  }

  return (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  )
}

export default NavigationItem