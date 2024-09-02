import { z } from "zod";


export const searchParamsSchema = z.object({
  category: z.string().optional(),
  query: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  sort: z.string().optional(),
  page: z.coerce.number().positive().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;