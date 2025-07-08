import React from 'react'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Slider = forwardRef(({ 
  className, 
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={cn(
        'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb',
        className
      )}
      style={{
        background: `linear-gradient(to right, #0D7A5F 0%, #0D7A5F ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
      }}
      {...props}
    />
  )
})

Slider.displayName = 'Slider'

export default Slider