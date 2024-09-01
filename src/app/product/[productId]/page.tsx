import ProductDetailsCard from '@/components/cards/ProductDetailsCard'
import ProductImagesSlider from '@/components/cards/ProductImagesSlider'
import SuspenseFallback from '@/components/cards/SuspenseFallback'
import ProductDetailsError from '@/components/error-components/ProductDetailsError'
import ProductsList from '@/components/lists/ProductsList'
import { baseUrl } from '@/lib/constants'
import { ProductsResponse } from '@/lib/types'
import { Tables } from '@/lib/utils/supabase/types'
import { Metadata } from 'next'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

type PropsType = {
  params: {
    productId: string
  }
}

export const revalidate = 3600

const ProductDetailsPage = ({ params }: PropsType) => {
  return (
    <main className="flex min-h-screen flex-col p-4 py-10">
      <div className="max-w-6xl w-full mx-auto flex flex-1 flex-col gap-10">
        {/* Used Suspense and ErrorBoundary inside instead of the loading.tsx and error.tsx files because I found a bug with the reset function in error.tsx */}
        <ErrorBoundary errorComponent={ProductDetailsError}>
          <Suspense fallback={<SuspenseFallback />}>
            <FetchProductDetails productId={params.productId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

const FetchProductDetails = async ({ productId }: { productId: string }) => {
  const [productRes, relatedProductsRes] = await Promise.all([
    fetch(`${baseUrl}/api/products/${productId}`),
    fetch(`${baseUrl}/api/products/${productId}/related`),
  ]);

  if (!productRes.ok && productRes.status !== 404) {
    throw new Error(productRes.statusText);
  }

  if (productRes.status === 404) {
    notFound();
  }

  const [product, relatedProducts] = await Promise.all([
    productRes.json(),
    relatedProductsRes.json()
  ]) as [
    Tables<'products'> & { category: Tables<'category'> },
    Tables<'products'>[]
  ]

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row-reverse gap-4">
        <ProductDetailsCard product={product} />
        <ProductImagesSlider
          images={product.images}
          discountPercentage={product.discounted_percentage}
        />
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Related Products</h3>
        {relatedProducts ? (
          <ProductsList products={relatedProducts} />
        ) : (
          <div className='flex-1 flex items-center justify-center h-[300px]'>
            <p>No related products found</p>
          </div>
        )}
      </section>
    </>
  );
}

export const generateMetadata = async ({ params }: PropsType): Promise<Metadata | undefined> => {
  const res = await fetch(`${baseUrl}/api/products/${params.productId}`)

  if (!res.ok) return

  const product = await res.json() as Tables<'products'>

  if (!product) return

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${baseUrl}/product/${product.id}`,
      images: product.images.map(image => ({
        url: image,
        width: 800,
        height: 600,
        alt: product.name
      }))
    }
  }
}

export const generateStaticParams = async () => {
  const res = await fetch(`${baseUrl}/api/products`);

  if (!res.ok) return [];

  const { data: products } = (await res.json()) as ProductsResponse;

  if (!products) return [];

  return products.map((product) => ({ productId: product.id }));
}

export default ProductDetailsPage