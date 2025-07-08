import React from 'react'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Card = forwardRef(({ 
  className, 
  variant = 'default',
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white shadow-lg border border-gray-100',
    elevated: 'bg-white shadow-xl border border-gray-100',
    glass: 'bg-white/95 backdrop-blur-sm shadow-lg border border-white/20',
    showcase: 'bg-gradient-to-br from-accent-50 to-accent-100 shadow-lg border border-accent-200',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl transition-all duration-300 hover:shadow-xl',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card