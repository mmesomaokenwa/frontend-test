'use client'

import { ErrorComponent } from 'next/dist/client/components/error-boundary'
import React from 'react'

const ProductDetailsError: ErrorComponent = ({ error, reset }) => {
  return (
    <div>ProductDetailsError</div>
  )
}

export default ProductDetailsError