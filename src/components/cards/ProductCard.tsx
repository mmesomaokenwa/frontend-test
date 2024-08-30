import React from "react";
import { Tables } from "@/lib/utils/supabase/types"
import Image from "next/image";
import Link from "next/link";
import { calculateDiscountPrice } from "@/lib/utils"

type Props = {
  product: Tables<'products'>;
};

const ProductCard = ({ product }: Props) => {
  return (
    <li className="flex">
      <Link
        aria-label={`Go to ${product.name}`}
        href={`/product/${product.id}`}
        className="flex flex-1 flex-col gap-3 relative"
      >
        <div className="flex items-center justify-center w-full aspect-square bg-gray-100 rounded-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="w-[80%] aspect-square object-contain"
          />
        </div>
        <h3 className="font-medium line-clamp-2">{product.name}</h3>
        <div className="flex items-end gap-2 mt-auto text-lg">
          <span className={`font-bold ${!!product.discounted_percentage && 'text-gray-400 line-through'}`}>${product.price}</span>
          {!!product.discounted_percentage && (
            <span className="font-bold">${calculateDiscountPrice(product.price, product.discounted_percentage).toFixed(2)}</span>
          )}
        </div>
        {!!product.discounted_percentage && (
          <div className="absolute top-4 -right-2 bg-blue-500 rounded-md p-2 shadow-md">
            <p className="text-white font-bold text-sm">{Math.ceil(product.discounted_percentage)}% OFF</p>
          </div>
        )}
      </Link>
    </li>
  );
};

export default ProductCard;
