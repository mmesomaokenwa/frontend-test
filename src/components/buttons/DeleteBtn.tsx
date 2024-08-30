'use client'

import { Tables } from '@/lib/utils/supabase/types'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { CiTrash } from 'react-icons/ci'

type PropsType = {
  productId: Tables<'products'>['id']
}

const DeleteBtn = ({ productId }: PropsType) => {
  const [status, setStatus] = useState<'pending' | 'success' | 'error' | null>(null)
  const ref = useRef<HTMLDialogElement>(null)

  const router = useRouter()

  const handleDelete = async () => {
    setStatus('pending')

    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      setStatus('error')
      return
    }

    setStatus('success')

    ref.current?.close()

    router.replace('/')
  }
  return (
    <>
      <button onClick={() => ref.current?.showModal()}>
        <CiTrash size={25} className="text-red-500" />
      </button>
      <dialog
        ref={ref}
        onClick={e => e.target === e.currentTarget && ref.current?.close()}
        className="max-w-[400px] w-full p-4 py-6 rounded-lg shadow-lg backdrop:bg-black/50"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xl text-center font-semibold">Are you sure?</p>
          <p className="text-center">This action cannot be undone.</p>
          <div className="grid grid-cols-2 gap-2 font-medium">
            <button
              onClick={() => ref.current?.close()}
              disabled={status === 'pending'}
              className="p-4 rounded-lg border"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={status === 'pending'}
              className="p-4 bg-red-500/30 rounded-lg text-red-500 border border-red-500"
            >
              {status === 'pending' ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default DeleteBtn