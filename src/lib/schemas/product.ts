import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description is too long'),
  price: z
    .coerce
    .number()
    .positive('Price must be a positive number'),
  discounted_percentage: z
    .coerce
    .number()
    .min(0, 'Discounted percentage must be a number between 0 and 100')
    .max(100, 'Discounted percentage must be a number between 0 and 100'),
  stock: z
    .coerce
    .number()
    .positive('Stock must be a positive number'),
  category: z
    .string()
    .min(1, 'Category is required'),
  images: z
    .union([
      z
        .array(z.string())
        .min(1, 'Images are required'),
      z
        .array(z.instanceof(File))
        .min(1, 'Images are required')
    ])
})

export type ProductFormValues = z.infer<typeof productSchema>