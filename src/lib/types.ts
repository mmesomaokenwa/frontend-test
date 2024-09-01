import { Tables } from "./utils/supabase/types";

export type ProductFormValues = Omit<Tables<"products">, "created_at" | "id" | "images"> & {
  images: string[] | File[];
};

export type Product = Tables<"products"> & { category: Tables<"category"> };

export type ProductsResponse = {
  data: Product[];
  count: number;
}

export type Category = Tables<"category">;

export type Issues = { [key: string]: string }

export type FormDataEntries = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};

export type ProductFormState = {
  status: "success" | "error" | null;
  message: string;
  fieldErrors: Issues | null;
};