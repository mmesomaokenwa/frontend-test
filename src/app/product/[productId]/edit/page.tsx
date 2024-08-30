import ProductDetailsError from '@/components/error-components/ProductDetailsError';
import ProductForm from '@/components/forms/ProductForm';
import Loader from '@/components/general/Loader';
import { baseUrl } from '@/lib/constants';
import { Tables } from '@/lib/utils/supabase/types';
import { Metadata } from 'next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React, { Suspense } from 'react'
import { generateStaticParams } from '../page';

type PropsType = {
  params: {
    productId: string
  }
}


export const metadata: Metadata = {
  title: "Edit Product Form",
  description: "Edit product",
}

const EditProductPage = ({ params }: PropsType) => {
  return (
    <main className="flex flex-col min-h-screen px-4 py-10">
      <div className="max-w-6xl w-full mx-auto flex flex-1 flex-col gap-10">
        <h2 className="text-2xl font-bold">Edit Product</h2>
        {/* Used Suspense and ErrorBoundary inside instead of the loading.tsx and error.tsx files because I found a bug with the reset function in error.tsx */}
        <ErrorBoundary errorComponent={ProductDetailsError}>
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center">
              <Loader />
            </div>
          }>
            <ProductEdit params={params} />
          </Suspense>
        </ErrorBoundary> 
      </div>
    </main>
  );
}

const ProductEdit = async ({ params }: PropsType) => {
  const res = await fetch(`${baseUrl}/api/products/${params.productId}`)

  const product = await res.json() as Tables<'products'> & { category: Tables<'category'> }

  return <ProductForm action="edit" product={product} />;
}

export { generateStaticParams }

export default EditProductPage