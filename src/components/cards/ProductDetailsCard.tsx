import { Tables } from '@/lib/utils/supabase/types'
import React from 'react'
import AddToFavoriteBtn from '../buttons/AddToFavoriteBtn'
import AddToCartBtn from '../buttons/AddToCartBtn'
import Link from 'next/link'
import { CiEdit } from 'react-icons/ci'
import DeleteBtn from '../buttons/DeleteBtn'

type PropsType = {
  product: Tables<'products'> & {
    category: Tables<'category'>
  }
}

const ProductDetailsCard = ({ product }: PropsType) => {
  const isStockSufficient = product.stock > 15
  const isOutOfStock = product.stock < 1
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-medium">{product.category.name}</p>
        <div className='flex items-center gap-4'>
          <Link
            aria-label="Edit Product Details"
            href={`/product/${product.id}/edit`}
          >
            <CiEdit size={25} />
          </Link>
          <DeleteBtn productId={product.id} />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold">{product.name}</h2>
      <p className="font-medium">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>
      <div className="flex flex-col gap-2">
        <div
          className={`p-2 rounded-md w-fit ${
            isStockSufficient
              ? "bg-green-500/10 text-green-500"
              : isOutOfStock
              ? "bg-red-500/10 text-red-500"
              : "bg-yellow-400/10 text-yellow-500"
          }`}
        >
          {isStockSufficient
            ? "In Stock"
            : isOutOfStock
            ? "Out Of Stock"
            : `Stock remaining: ${product.stock}`}
        </div>
        <div className="flex items-center gap-4">
          <AddToFavoriteBtn />
          <AddToCartBtn disabled={isOutOfStock} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard