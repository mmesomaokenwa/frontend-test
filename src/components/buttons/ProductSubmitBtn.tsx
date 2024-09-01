'use client'

import { ProductFormState } from '@/lib/types'
import React from 'react'
import { useFormStatus } from 'react-dom'

type PropsType = {
  formState: ProductFormState
  action: "create" | "edit"
}

const ProductSubmitBtn = ({ formState, action }: PropsType) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      className="w-full flex items-center justify-center p-3 bg-blue-500 text-white font-medium rounded-md disabled:bg-blue-500/50 transition-colors duration-300"
      type="submit"
    >
      {pending
        ? "Submitting..."
        : formState.status === "success"
        ? "Submitted"
        : formState.status === "error"
        ? "Retry"
        : action === "create"
        ? "Create Product"
        : "Update Product"}
    </button>
  );
}

export default ProductSubmitBtn