import React, { ComponentProps } from 'react'

type PropsType = {
  id: string
  label: string
  isTextArea?: boolean
  error?: string
} & ComponentProps<'input'>

const FormField = ({ id, error, label, isTextArea, ...props }: PropsType) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {isTextArea ? (
        <textarea
          id={id}
          className="p-2 border border-gray-300 rounded-md"
          {...props as ComponentProps<'textarea'>}
        />
      ) : (
        <input
          id={id}
          className="border border-gray-300 p-2 rounded-md"
          {...props as ComponentProps<'input'>}
        />
      )}
      {error && <small role='status' className="text-red-500">{error}</small>}
    </div>
  );
}

export default FormField