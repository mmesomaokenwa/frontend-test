'use client'

import React from 'react'
import { ErrorComponent } from 'next/dist/client/components/error-boundary'

const HomeError: ErrorComponent = ({ error, reset }) => {
  return (
    <div>HomeError</div>
  )
}

export default HomeError