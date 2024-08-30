'use client'

import React from 'react'
import { FaRegHeart } from "react-icons/fa";

const AddToFavoriteBtn = () => {
  return (
    <button className="p-4 bg-gray-100 rounded-full">
      <FaRegHeart />
    </button>
  );
}

export default AddToFavoriteBtn