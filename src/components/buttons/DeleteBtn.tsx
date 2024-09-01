'use client'

import { Tables } from '@/lib/utils/supabase/types'
import React, { useRef } from 'react'
import { CiTrash } from 'react-icons/ci'
import DeleteDialog from '../modals/DeleteDialog'

type PropsType = {
  productId: Tables<'products'>['id']
}

const DeleteBtn = ({ productId }: PropsType) => {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button aria-label='Delete' onClick={() => ref.current?.showModal()}>
        <CiTrash size={25} className="text-red-500" />
      </button>
      <DeleteDialog ref={ref} productId={productId} />
    </>
  );
}

export default DeleteBtn