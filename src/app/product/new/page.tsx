import ProductForm from '@/components/forms/ProductForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Create Product Form",
  description: "Create new product",
};

const CreateProductPage = () => {
  return (
    <main className='flex flex-col min-h-screen px-4 py-10'>
      <div className="max-w-6xl w-full mx-auto flex flex-1 flex-col gap-10">
        <h2 className='text-2xl font-bold'>Create Product</h2>
        <ProductForm action='create' />
      </div>
    </main>
  )
}

export default CreateProductPage