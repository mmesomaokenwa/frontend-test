'use client'

import { useState, useEffect } from 'react'

export const useDebounce = (value: string, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay || 200)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}