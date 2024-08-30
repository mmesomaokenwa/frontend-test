'use client'

import { Tables } from '@/lib/utils/supabase/types'
import Image from 'next/image'
import React, { useState } from 'react'

type PropsType = {
  images: Tables<'products'>['images']
  discountPercentage: Tables<'products'>['discounted_percentage']
}

const ProductImagesSlider = ({ images, discountPercentage }: PropsType) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <div className="flex-1 flex flex-col lg:flex-row-reverse">
      <div className="flex-1 w-full aspect-square relative">
        <div className="w-full aspect-square overflow-hidden">
          <div
            className="flex transition-all duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={image}
                width={500}
                height={500}
                className="w-full aspect-square object-contain shrink-0 transition-all duration-500"
                style={{
                  transform: currentIndex === index ? "scale(1)" : "scale(0.5)",
                }}
              />
            ))}
          </div>
          {!!discountPercentage && (
            <div className="absolute top-0 right-0 p-2 rounded-md bg-blue-500 shadow-lg">
              <p className="text-xl font-bold text-white">
                {Math.ceil(discountPercentage)}% OFF
              </p>
            </div>
          )}
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex lg:flex-col justify-center gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`size-[100px] cursor-pointer bg-gray-100 rounded-xl border-2 transition-colors duration-500 ${
                currentIndex === index
                  ? "border-green-500"
                  : "border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image}
                alt={image}
                width={100}
                height={100}
                className="w-full aspect-square object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImagesSlider