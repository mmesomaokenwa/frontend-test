'use client'

import useCategories from '@/lib/hooks/useCategories'
import React, { ComponentPropsWithRef } from 'react'

type PropsType = ComponentPropsWithRef<'select'>

const CategorySelect = (props: PropsType) => {
  const { data: categories, isLoading, error } = useCategories()
  return (
    <select
      className={`p-[9px] border border-gray-300 rounded-md ${props.className}`}
      {...props}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect