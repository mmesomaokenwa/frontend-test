'use client'

import React, { useEffect, useRef, useState } from 'react'
import FormField from '../inputs/FormField'
import Image from 'next/image'
import { ProductFormValues, productSchema } from '@/lib/schemas/product'
import { useRouter } from 'next/navigation'
import { formatIssues } from '@/lib/utils'
import { Issues, Product } from '@/lib/types'
import { useFormState } from 'react-dom'
import { createProduct, editProduct } from '@/lib/actions/product-form-actions'
import ProductSubmitBtn from '../buttons/ProductSubmitBtn'
import CategorySelect from '../inputs/CategorySelect'

type PropsType = {
  product?: Product
  action: 'create' | 'edit'
}

const initialState = { status: null, message: "", fieldErrors: null }

const ProductForm = ({ product, action }: PropsType) => {
  const [formState, formAction] = useFormState(action === 'create' ? createProduct : editProduct, initialState)
  const [errors, setErrors] = useState<Issues | null>(null)
  const [images, setImages] = useState<ProductFormValues['images']>([])

  const ref = useRef<HTMLFormElement>(null)

  const router = useRouter()

  useEffect(() => {
    if (product?.images) setImages(product.images)
  }, [product?.images, setImages])

  useEffect(() => {
    if (formState.fieldErrors) setErrors(formState.fieldErrors)
  }, [formState.fieldErrors, setErrors])
  
  useEffect(() => { 
    if (formState.status !== 'success') return

    action === 'create'
      ? router.push('/')
      : router.push(`/product/${product?.id}`)
  }, [formState.status, router])

  const validateForm = () => {
    if (!ref.current) return

    setErrors(null)

    const formData = new FormData(ref.current as HTMLFormElement)

    const values = {
      ...Object.fromEntries(formData),
      images: formData.getAll('images')
    }

    const { error } = productSchema.safeParse(values)

    if (error) {
      setErrors(formatIssues(error.issues))
    }
  }

  return (
    <form ref={ref} action={formAction} className="flex flex-col gap-4">
      {action === 'edit' && (
        <input type="hidden" name='id' value={product?.id} />
      )}
      <FormField
        id="name"
        label="Product Name"
        type="text"
        name="name"
        placeholder="Product Name"
        defaultValue={product?.name}
        onBlur={validateForm}
        error={errors?.name || formState.fieldErrors?.name}
      />

      <FormField
        id="description"
        isTextArea
        label="Product Description"
        type="text"
        name="description"
        placeholder="Product Description"
        defaultValue={product?.description}
        onBlur={validateForm}
        error={errors?.description || formState.fieldErrors?.description}
      />

      {!!images.length && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Image
              key={index}
              src={
                image instanceof File
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
          setImages(Array.from(e.target.files || []))
        }
        onBlur={validateForm}
        error={errors?.images || formState.fieldErrors?.images}
      />

      <div className="grid items-start md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-medium">
            Product Category
          </label>
          <CategorySelect
            id="category"
            name="category"
            defaultValue={product?.category?.id}
            className="p-[9px] border border-gray-300 rounded-md"
          />
          <small role='status' className="text-red-500">{errors?.category || formState.fieldErrors?.category}</small>
        </div>

        <FormField
          id="price"
          name="price"
          label="Product Price"
          type="number"
          min={0}
          placeholder="Product Price"
          defaultValue={product?.price}
          onBlur={validateForm}
          error={errors?.price || formState.fieldErrors?.price}
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
          defaultValue={product?.stock}
          onBlur={validateForm}
          error={errors?.stock || formState.fieldErrors?.stock}
        />

        <FormField
          id="discounted_percentage"
          name="discounted_percentage"
          label="Discount"
          type="number"
          placeholder=""
          defaultValue={product?.discounted_percentage || undefined}
          onBlur={validateForm}
          error={errors?.discounted_percentage || formState.fieldErrors?.discounted_percentage}
        />
      </div>

      <ProductSubmitBtn action={action} formState={formState} />
    </form>
  );
}

export default ProductForm