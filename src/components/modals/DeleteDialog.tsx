'use client'

import React, { forwardRef, useCallback } from 'react'
import DeleteProductForm from '../forms/DeleteProductForm';

type PropsType = {
  productId: string
}

const DeleteDialog = forwardRef<HTMLDialogElement, PropsType>(({ productId }, ref) => {
  const handleClose = useCallback(() => {
    (ref as any)?.current?.close();
  }, [ref]);

  return (
    <dialog
      ref={ref}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="max-w-[400px] w-full p-4 py-6 rounded-lg shadow-lg backdrop:bg-black/50"
    >
      <DeleteProductForm productId={productId} handleClose={handleClose} />
    </dialog>
  );
});

DeleteDialog.displayName = "DeleteDialog"

export default DeleteDialog