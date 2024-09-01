import { Tables } from "./utils/supabase/types";

export type ProductFormValues = Omit<Tables<"products">, "created_at" | "id" | "images"> & {
  images: string[] | File[];
};

export type ProductsResponse = {
  data: Tables<"products">[];
  count: number;
}

export type Issues = { [key: string]: string }

export type FormDataEntries = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};

export type ProductFormState = {
  status: "success" | "error" | null;
  message: string;
  fieldErrors: Issues | null;
};