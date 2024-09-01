'use client'

import { ProductFormState } from '@/lib/types'
import React from 'react'
import { useFormStatus } from 'react-dom'
import Button from './Button'

type PropsType = {
  formState: ProductFormState
  action: "create" | "edit"
}

const ProductSubmitBtn = ({ formState, action }: PropsType) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending}
      variant={formState?.status === "error" ? "error" : "primary"}
      size="lg"
      className="w-full flex items-center justify-center p-3 font-medium rounded-md disabled:opacity-50 transition-all duration-300"
      type="submit"
    >
      {pending
        ? "Submitting..."
        : formState?.status === "success"
        ? "Submitted"
        : formState?.status === "error"
        ? "Retry"
        : action === "create"
        ? "Create Product"
        : "Update Product"}
    </Button>
  );
}

export default ProductSubmitBtn