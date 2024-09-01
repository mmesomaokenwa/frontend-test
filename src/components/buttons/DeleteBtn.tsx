'use client'

import { Tables } from '@/lib/utils/supabase/types'
import React, { useRef } from 'react'
import { CiTrash } from 'react-icons/ci'
import DeleteDialog from '../modals/DeleteDialog'
import Button from './Button'

type PropsType = {
  productId: Tables<'products'>['id']
}

const DeleteBtn = ({ productId }: PropsType) => {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <Button
        aria-label='Delete'
        variant='ghost'
        className='p-0'
        onClick={() => ref.current?.showModal()}
      >
        <CiTrash size={25} className="text-red-500" />
      </Button>
      <DeleteDialog ref={ref} productId={productId} />
    </>
  );
}

export default DeleteBtn