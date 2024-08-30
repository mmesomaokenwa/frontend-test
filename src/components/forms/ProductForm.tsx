'use client'

import { Tables } from '@/lib/utils/supabase/types'
import React, { useState } from 'react'
import FormField from './FormField'
import useCategories from '@/lib/hooks/useCategories'
import Image from 'next/image'
import { ProductFormValues } from '@/lib/types'
import { useRouter } from 'next/navigation'

type PropsType = {
  product?: Tables<'products'> & { category: Tables<'category'> }
  action: 'create' | 'edit'
}



const ProductForm = ({ product, action }: PropsType) => {
  const [form, setForm] = useState<ProductFormValues>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    discounted_percentage: product?.discounted_percentage || 0,
    category: product?.category.id || '',
    images: product?.images || [],
  })

  const [status, setStatus] = useState<'pending' | 'error' | 'success' | null>(null)

  const { data: categories, isLoading, error } = useCategories()

  const router = useRouter()

  console.log(status)

  const handleSubmit = async (formData: FormData) => {
    setStatus((prev) => "pending")
    if (action === 'edit') {
      const res = await fetch(`/api/products/${product?.id}`, {
        method: 'PATCH',
        body: formData
      })

      if (!res.ok) {
        console.log(res.statusText)
        return setStatus(prev => 'error')
      }

      resetForm(form)

      setStatus(prev => 'success')

      router.push(`/product/${product?.id}`)
    }

    if (action === 'create') { 
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        console.log(res.statusText)
        return setStatus(prev => 'error')
      }

      resetForm()

      setStatus(prev => 'success')

      router.push('/')
    }
  }

  const resetForm = (form?: ProductFormValues) => {
    setForm({
      name: form?.name || '',
      description: form?.description || '',
      price: form?.price || 0,
      stock: form?.stock || 0,
      discounted_percentage: form?.discounted_percentage || 0,
      category: form?.category || '',
      images: form?.images || [],
    })
  }
  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <FormField
        id="name"
        label="Product Name"
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={""}
      />

      <FormField
        id="description"
        isTextArea
        label="Product Description"
        type="text"
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        error={""}
      />

      {!!form.images.length && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {form.images.map((image, index) => (
            <Image
              key={index}
              src={
                action === "create"
                  ? URL.createObjectURL(image as Blob)
                  : (image as string)
              }
              alt="Product Image"
              width={300}
              height={300}
              className="aspect-square object-contain"
            />
          ))}
        </div>
      )}

      <FormField
        id="images"
        label="Product Images"
        type="file"
        name="images"
        accept="images/*"
        multiple
        placeholder="Product Images"
        onChange={(e) =>
          setForm({ ...form, images: Array.from(e.target.files || []) })
        }
        error={""}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-medium">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            className="p-[9px] border border-gray-300 rounded-md"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <FormField
          id="price"
          name="price"
          label="Product Price"
          type="number"
          min={0}
          placeholder="Product Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          error={""}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="stock"
          name="stock"
          label="Product Stock"
          type="number"
          min={0}
          placeholder="Product Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          error={""}
        />

        <FormField
          id="discounted_percentage"
          name="discounted_percentage"
          label="Product Discounted Percentage"
          type="number"
          min={0}
          placeholder="Product Discounted Percentage"
          value={form.discounted_percentage || 0}
          onChange={(e) =>
            setForm({ ...form, discounted_percentage: Number(e.target.value) })
          }
          error={""}
        />
      </div>

      <button
        disabled={status === "pending"}
        className="w-full flex items-center justify-center p-3 bg-blue-500 text-white font-medium rounded-md disabled:bg-blue-500/50 transition-colors duration-300"
        type="submit"
      >
        {status === "pending" ? (
          "Submitting..."
        ) : status === "success" ? (
          "Submitted"
        ) : status === "error" ? (
          "Retry"
        ) : action === "create" ? (
          "Create Product"
        ) : (
          "Update Product"
        )}
      </button>
    </form>
  );
}

export default ProductForm