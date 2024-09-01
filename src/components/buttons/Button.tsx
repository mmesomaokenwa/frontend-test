import { cn } from '@/lib/utils'
import React, { ComponentPropsWithRef } from 'react'

type PropsType = {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'error'
} & ComponentPropsWithRef<'button'>

const Button = ({ size = 'md', variant = 'primary', ...props}: PropsType) => {
  const sizes = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base'
  }

  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-300 text-black',
    error: 'bg-red-500 text-white',
    accent: 'bg-accent text-white',
    ghost: 'bg-transparent text-black',
    outline: 'bg-transparent text-blue-500 border border-blue-500'
  }

  const classes = `${sizes[size]} ${variants[variant]}`

  return (
    <button
      {...props}
      className={cn(`rounded-md ${classes} ${props.className}`)}
    >
      {props.children}
    </button>
  );
}

export default Button