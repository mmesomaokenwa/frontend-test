import Image from "next/image";
import { Suspense } from "react";
import ProductsList from "@/components/lists/ProductsList"
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/components/error-components/HomeError"
import SearchForm from "@/components/forms/SearchForm";
import ProductFilterForm from "@/components/forms/ProductFilterForm";
import { parseSearchParams } from "@/lib/utils";
import { ProductsResponse } from "@/lib/types";
import { baseUrl } from "@/lib/constants";
import SuspenseFallback from "@/components/cards/SuspenseFallback";
import { SearchParams, searchParamsSchema } from "@/lib/schemas/search-params";
import Pagination from "@/components/navigation/Pagination";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 3600

export default function Home({ searchParams }: Props) {
  const { data } = searchParamsSchema.safeParse(searchParams)
  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex flex-col gap-10">
        <div className="p-4 bg-gray-200 relative">
          <div className="max-w-6xl h-[350px] mx-auto flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-blue-500">Home</h2>
              <p className="text-3xl font-bold">Explore All Products</p>
            </div>
            <Image
              src={"/assets/apple-watch-ultra-2.png"}
              alt=""
              width={300}
              height={300}
              priority
              className="hidden md:block"
            />
          </div>
          <div className="absolute -bottom-6 left-0 w-full h-20 flex items-center justify-center">
            <SearchForm />
          </div>
        </div>
        <div className="px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4">
            <ProductFilterForm />
            <ErrorBoundary errorComponent={HomeError}>
              <Suspense fallback={<SuspenseFallback className="min-h-[500px]" />}>
                <HomeProducts searchParams={data || {}} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </section>
    </main>
  );
}

const HomeProducts = async ({ searchParams }: { searchParams: SearchParams }) => {
  const stringParams = parseSearchParams({ ...searchParams, page: (searchParams.page || 1).toString() }).toString()
  
  const res = await fetch(`${baseUrl}/api/products?${stringParams}`)

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const { data: products, count } = await res.json() as ProductsResponse

  return (
    <div className="w-full flex flex-col items-center gap-6 ">
      {products.length ? (
        <>
          <ProductsList products={products} />
          <Pagination searchParams={searchParams} count={count} />
        </>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
