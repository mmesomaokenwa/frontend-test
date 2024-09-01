'use client'

import { useState, useEffect } from 'react'
import { Category } from '../types'

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Category[]>([])

  const controller = new AbortController()

  useEffect(() => { 
    const fetchCategories = async () => {
      setIsLoading(true)

      const res = await fetch('/api/categories', {
        signal: controller.signal
      })

      if (!res.ok) { 
        setError(res.statusText)

        return setIsLoading(false)
      }

      const data = await res.json()

      setIsLoading(false)

      setData(data)
    }

    fetchCategories()

    return () => controller.abort()
  }, [])

  return { isLoading, error, data }
}

export default useCategories