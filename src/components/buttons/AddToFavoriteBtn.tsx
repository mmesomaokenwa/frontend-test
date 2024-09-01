'use client'

import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import Button from './Button';

const AddToFavoriteBtn = () => {
  return (
    <Button
      aria-label='Add to Favorites'
      variant='secondary'
      size='lg'
      className="p-4 bg-gray-100 rounded-full text-black"
    >
      <FaRegHeart />
    </Button>
  );
}

export default AddToFavoriteBtn