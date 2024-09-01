'use client'

import { ErrorComponent } from 'next/dist/client/components/error-boundary'
import React from 'react'

const ProductDetailsError: ErrorComponent = ({ error, reset }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 py-8">
      <p className="text-xl font-semibold text-center">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "An error occured."}
      </p>
      <button
        className="p-4 px-8 rounded-md bg-blue-500 text-white"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}

export default ProductDetailsError