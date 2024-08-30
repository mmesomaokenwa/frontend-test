'use client'

import { useDebounce } from '@/lib/hooks/useDebounce'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchForm = () => {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '')
  const debouncedValue = useDebounce(searchTerm, 300)
  const router = useRouter()

  useEffect(() => {
    let newParams

    if (debouncedValue) { 
      newParams = formUrlQuery({
        params: searchParams.toString(),
        pairs: { query: debouncedValue }
      })
    } else {
      newParams = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['query'],
      })
    }

    router.push(`?${newParams}`, { scroll: false })
  }, [debouncedValue])
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className='w-[250px] rounded-md shadow-lg'
    >
      <label
        htmlFor='search'
        className='sr-only'
      ></label>
      <input
        id='search'
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full p-4 rounded-md"
      />
    </form>
  )
}

export default SearchForm