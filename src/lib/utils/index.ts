import { ZodIssue } from "zod";
import { Issues } from "../types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/server";

export const cn = (...inputs: string[]) => {
  return twMerge(clsx(inputs));
};

export const calculateDiscountPrice = (price: number, discountPercentage: number) => {
  return price - (price * discountPercentage) / 100;
};

export const parseSearchParams = (
  searchParams: { [key: string]: string } | string
) => {
  return new URLSearchParams(searchParams);
};

export const formUrlQuery = ({
  params,
  pairs
}: {
  params: string;
  pairs: { [key: string]: string | null }
}) => {
  const searchParams = parseSearchParams(params)

  Object.entries(pairs).forEach(([key, value]) => {
    if (!value) return searchParams.delete(key)
    searchParams.set(key, value)
  })

  return searchParams.toString()
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) => {
  const searchParams = parseSearchParams(params)

  keysToRemove.forEach((key) => {
    searchParams.delete(key)
  });

  return searchParams.toString()
};

export const formatIssues = (issues: ZodIssue[]): Issues => {
  return issues.reduce((acc, issue) => {
    acc[issue.path[0]] = issue.message
    return acc
  }, {} as Issues)
}

export const generateFormData = (data: { [key: string]: string | number | any[] }): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") formData.append(key, value);
    else if (typeof value === "number")
      formData.append(key, value.toString());
    else if (Array.isArray(value)) {
      value.forEach((val) => formData.append(key, val));
    }
  });

  return formData
}

export const storeImage = async (image: File): Promise<string> => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("products")
    .upload(`public/${image.name}`, image);

  if (error) {
    console.log(error);
    return "";
  }

  const { data: { publicUrl } } = supabase.storage
    .from("products")
    .getPublicUrl(`public/${image.name}`);

  return publicUrl;
}

export const updateImage = async (image: File): Promise<string> => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("products")
    .upload(`public/${image.name}`, image, {
      upsert: true, // overwritten if the file already exists
    });

  if (error) {
    console.log(error);
    return "";
  }

  const { data: { publicUrl } } = supabase.storage
    .from("products")
    .getPublicUrl(`public/${image.name}`);

  return publicUrl;
}