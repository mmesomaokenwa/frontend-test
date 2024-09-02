import { productsPerPage } from '@/lib/constants';
import { SearchParams } from '@/lib/schemas/search-params';
import { parseSearchParams } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

type PropsType = {
  searchParams: SearchParams
  count: number
}

const Pagination = ({ searchParams, count }: PropsType) => {
  const [prevPageParams, nextPageParams] = [
    parseSearchParams({
      ...searchParams,
      price: searchParams.price?.toString() || '',
      page: ((searchParams.page || 1) - 1).toString(),
    }),
    parseSearchParams({
      ...searchParams,
      price: searchParams.price?.toString() || '',
      page: ((searchParams.page || 1) + 1).toString(),
    }),
  ];

  const pages = count / productsPerPage

  const canGoPrev = (searchParams.page || 1) >= 2

  const canGoNext = (searchParams.page || 1) <= pages
  return (
    <div className="flex justify-center gap-6">
      {canGoPrev && (
        <Link
          href={`?${prevPageParams}`}
          className="p-2 md:p-4 px-12 bg-gray-100 rounded-md font-semibold"
        >
          Previous
        </Link>
      )}
      {canGoNext && (
        <Link
          href={`?${nextPageParams}`}
          className="p-2 md:p-4 px-12 bg-gray-100 rounded-md font-semibold"
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default Pagination