import React from 'react'
import { FaCartPlus } from "react-icons/fa6";

type PropsType = {
  disabled: boolean
}

const AddToCartBtn = ({ disabled }: PropsType) => {
  return (
    <button
      disabled={disabled}
      className={`rounded-2xl p-4 flex flex-1 items-center justify-center gap-4 bg-black text-white font-bold shadow-lg disabled:bg-black/70 disabled:cursor-not-allowed`}
    >
      <span className="text-xl">Add to cart</span>
      <span className='p-2 bg-gray-600 rounded-full'>
        <FaCartPlus />
      </span>
    </button>
  );
}

export default AddToCartBtn