'use client'

import useCategories from '@/lib/hooks/useCategories'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import CategorySelect from '../inputs/CategorySelect'

const prices = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '500', value: 500 },
  { label: '1000', value: 1000 },
  { label: '2000', value: 2000 },
]

const ProductFilterForm = () => {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({
    category: searchParams.get('category') || '',
    price: searchParams.get('price') || '',
  })
  const router = useRouter()
  const { data: categories } = useCategories()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { category, price } = form

    if (!category && !price) return

    const newParams = formUrlQuery({
      params: searchParams.toString(),
      pairs: { category, price, page: '1' }
    })

    router.push(`?${newParams}`, { scroll: false })
  }

  const handleReset = () => {
    setForm({ category: '', price: '' })

    const newParams = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ['category', 'price', 'page'],
    })

    router.push(`?${newParams}`, { scroll: false })
  }
  return (
    <form onSubmit={handleSubmit} className="flex lg:flex-col flex-wrap gap-4 lg:gap-8">
      <CategorySelect
        className="lg:hidden text-sm p-2 border rounded-md"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <select
        className="lg:hidden text-sm p-2 border rounded-md"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      >
        <option value="">Price</option>
        {prices.map((price) => (
          <option key={price.value} value={price.value}>
            {price.label}
          </option>
        ))}
      </select>

      <div className="hidden lg:flex flex-col gap-4 w-[200px]">
        <div className="pb-2 border-b-2 border-blue-500">
          <p className="text-xl font-semibold uppercase">Categories</p>
        </div>
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-4 font-medium"
          >
            <input
              type="radio"
              name="categories"
              value={category.id}
              checked={form.category === category.id}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {category.name}
          </label>
        ))}
      </div>

      <div className="hidden lg:flex flex-col gap-4">
        <div className="pb-2 border-b-2 border-blue-500">
          <p className="text-xl font-semibold uppercase">Price</p>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {prices.map((price) => (
            <label
              key={price.value}
              data-checked={form.price === price.value.toString()}
              className="flex items-center justify-center aspect-square bg-gray-50 rounded-lg border border-transparent data-[checked=true]:border-blue-500 font-medium"
            >
              <input
                type="radio"
                name="price"
                value={price.value}
                checked={form.price === price.value.toString()}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="hidden"
              />
              {price.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="p-2 px-4 border-2 border-blue-500 rounded-md text-blue-500 font-medium"
        >
          Reset
        </button>
        <button
          type="submit"
          className="p-2 px-4 rounded-md bg-blue-500 text-white font-medium"
        >
          Filter
        </button>
      </div>
    </form>
  );
}

export default ProductFilterForm