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
      try {
        setIsLoading(true);

        const res = await fetch("/api/categories", {
          signal: controller.signal,
        });

        if (!res.ok) {
          setError(res.statusText);

          return setIsLoading(false);
        }

        const data = await res.json();

        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories()

    return () => controller.abort()
  }, [])

  return { isLoading, error, data }
}

export default useCategories