import { deleteProduct } from '@/lib/actions/product-form-actions'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Button from '../buttons/Button'

type PropsType = {
  productId: string
  handleClose: () => void
}

const initialState = { message: "", status: null };

const DeleteProductForm = ({ productId, handleClose }: PropsType) => {
  const [formState, formAction] = useFormState(deleteProduct, initialState)

  const router = useRouter()

  useEffect(() => {
    if (formState.status !== 'success') return

    handleClose()

    router.replace('/')
  }, [formState.status, handleClose, router])

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <p className="text-xl text-center font-semibold">Are you sure?</p>
      <p className="text-center">This action cannot be undone.</p>
      <input type="hidden" name="id" value={productId} />
      <Buttons handleClose={handleClose} />
    </form>
  );
}

const Buttons = ({ handleClose }: Omit<PropsType, "productId">) => {
  const { pending } = useFormStatus();
  return (
    <div className="grid grid-cols-2 gap-2 font-medium">
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleClose}
        disabled={pending}
        className="rounded-lg border-gray-300 text-black"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size="lg"
        variant="error"
        disabled={pending}
        className="bg-red-500/30 rounded-lg text-red-500 border border-red-500"
      >
        {pending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}

export default DeleteProductForm