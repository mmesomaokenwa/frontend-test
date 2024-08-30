'use client'

import { Tables } from '@/lib/utils/supabase/types'
import { useState, useEffect } from 'react'

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Tables<'category'>[]>([])

  useEffect(() => { 
    const fetchCategories = async () => {
      setIsLoading(true)

      const res = await fetch('/api/categories')

      if (!res.ok) { 
        setError(res.statusText)

        return setIsLoading(false)
      }

      const data = await res.json()

      setIsLoading(false)

      setData(data)
    }

    fetchCategories()
  }, [])

  return { isLoading, error, data }
}

export default useCategories