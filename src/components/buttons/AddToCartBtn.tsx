import React from 'react'
import { FaCartPlus } from "react-icons/fa6";
import Button from './Button';

type PropsType = {
  disabled: boolean
}

const AddToCartBtn = ({ disabled }: PropsType) => {
  return (
    <Button
      disabled={disabled}
      variant='primary'
      size='lg'
      className={`rounded-2xl flex flex-1 items-center justify-center gap-4 bg-black font-bold shadow-lg disabled:bg-black/70 disabled:cursor-not-allowed`}
    >
      <span className="text-xl">Add to cart</span>
      <span className='p-2 bg-gray-600 rounded-full'>
        <FaCartPlus />
      </span>
    </Button>
  );
}

export default AddToCartBtn