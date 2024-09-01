import React from "react";
import ProductCard from "../cards/ProductCard";
import { Tables } from "@/lib/utils/supabase/types";
import { cn } from "@/lib/utils";

type Props = {
  products: Tables<'products'>[]
  className?: string
};

const ProductsList = ({ products, className }: Props) => {
  return (
    <ul
      className={cn(
        `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-x-4 gap-y-6 ${className}`
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
