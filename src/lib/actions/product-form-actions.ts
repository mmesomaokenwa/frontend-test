'use server'

import { baseUrl } from "../constants"
import { productSchema } from "../schemas/product"
import { FormDataEntries, ProductFormState } from "../types"
import { formatIssues, generateFormData } from "../utils"


export const createProduct = async (prevState: any, formData: FormData): Promise<ProductFormState> => {
  try {
    const values: FormDataEntries = {
      ...Object.fromEntries(formData),
      images: formData.getAll("images"),
    };

    const { data, error } = productSchema.safeParse(values);

    if (error) {
      return {
        status: "error",
        message: "Invalid form data",
        fieldErrors: formatIssues(error.issues),
      };
    }

    const newFormData = generateFormData(data);

    const res = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      body: newFormData,
    });

    if (!res.ok) {
      console.log(res.statusText);
      return {
        status: "error",
        message: "Failed to create product",
        fieldErrors: null,
      };
    }

    return {
      status: "success",
      message: "Product created successfully",
      fieldErrors: null,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create product",
      fieldErrors: null,
    }
  }
}

export const editProduct = async (prevState: any, formData: FormData): Promise<ProductFormState> => {
  try {
    const values: FormDataEntries = {
      ...Object.fromEntries(formData),
      images: formData.getAll("images"),
    };

    if (!values.id) {
      return {
        status: "error",
        message: "Invalid form data",
        fieldErrors: null,
      };
    }

    const { data, error } = productSchema.safeParse(values);

    if (error) {
      return {
        status: "error",
        message: "Invalid form data",
        fieldErrors: formatIssues(error.issues),
      };
    }

    const newFormData = generateFormData(data);

    const res = await fetch(`${baseUrl}/api/products/${values.id}`, {
      method: "PATCH",
      body: newFormData,
    });

    if (!res.ok) {
      console.log(res.statusText);
      return {
        status: "error",
        message: "Failed to update product",
        fieldErrors: null,
      };
    }

    return {
      status: "success",
      message: "Product updated successfully",
      fieldErrors: null,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update product",
      fieldErrors: null,
    }
  }
}

export const deleteProduct = async (prevState: any, formData: FormData): Promise<Omit<ProductFormState, 'fieldErrors'>> => {
  try {
    const productId = formData.get("id");

    if (!productId) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const res = await fetch(`${baseUrl}/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.log(res.statusText);
      return {
        status: "error",
        message: "Failed to delete product",
      };
    }

    return {
      status: "success",
      message: "Product deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete product",
    }
  }
}