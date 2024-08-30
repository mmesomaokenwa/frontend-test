import { Tables } from "./utils/supabase/types";

export type ProductFormValues = Omit<Tables<"products">, "created_at" | "id" | "images"> & {
  images: string[] | File[];
};

export type ProductsResponse = {
  data: Tables<"products">[];
  count: number;
}