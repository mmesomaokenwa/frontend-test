'use client'

import React from 'react'
import { ErrorComponent } from 'next/dist/client/components/error-boundary'
import Button from '../buttons/Button';

const HomeError: ErrorComponent = ({ error, reset }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 py-8">
      <p className="text-xl font-semibold text-center">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "An error occured."}
      </p>
      <Button
        variant='primary'
        size='lg'
        className="px-8"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}

export default HomeError