import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { ProductFormValues } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => { 
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, category(*)")
    .eq("id", params.productId)
    .single();
  
  if (error) { 
    console.log(error)
    return NextResponse.json(
      null,
      { status: Number(error.code), statusText: error.message }
    );
  }

  return NextResponse.json(data)
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => { 
  const supabase = createClient()

  const formData = await req.formData();

  const body: ProductFormValues = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    discounted_percentage: Number(formData.get("discounted_percentage")),
    category: formData.get("category") as string,
    images: formData.getAll("images") as File[],
  };

  let images

  // upload images to storage if images were added or changed
  if ((body.images as File[])[0].name && (body.images as File[])[0].size) {
    images = await Promise.all(
      (body.images as File[]).map(async (image) => {
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
      })
    );

    images = images.filter((image) => image !== "");
  }

  const { error, status, statusText } = await supabase
    .from("products")
    .update({ ...body, images })
    .eq("id", params.productId)
    .single();
  
  if (error) { 
    console.log(error)
    return NextResponse.json(null, { status, statusText });
  }

  revalidatePath(`/product/${params.productId}`)
  revalidatePath(`/product/${params.productId}/edit`, 'page')

  return NextResponse.json(null)
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => { 
  const supabase = createClient()

  const { data, error, status, statusText } = await supabase
    .from("products")
    .delete()
    .eq("id", params.productId)
    .select()
    .single();
  
  if (error) { 
    console.log(error)
    return NextResponse.json(null, { status, statusText });
  }

  // get images from the database
  const images = data.images.map(image => {
    const paths = image.split('/')
    return paths.slice(-2).join('/')
  })

  // delete images from storage
  await supabase.storage
    .from('products')
    .remove(images)

  revalidatePath('/')
  revalidatePath(`/product/${params.productId}`)
  revalidatePath(`/product/${params.productId}/edit`, 'page')

  return NextResponse.json(null)
}