import { productsPerPage } from "@/lib/constants";
import { productSchema } from "@/lib/schemas/product";
import { FormDataEntries } from "@/lib/types";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => { 
  const supabase = createClient()

  const { searchParams } = req.nextUrl

  const category = searchParams.get('category')
  const price = searchParams.get('price')
  const query = searchParams.get('query')
  const page = searchParams.get('page')

  const conditions: string[] = [];
  if (category) conditions.push(`category.eq.${category}`);
  if (price) conditions.push(`price.lte.${price}`);
  if (query) conditions.push(`name.ilike.%${query}%`);

  const offset = page && typeof Number(page) === 'number' ? (Number(page) - 1) * productsPerPage : undefined

  let res

  if (conditions.length) { 
    if (offset !== undefined) res = await supabase
      .from("products")
      .select("*, category(*)", { count: "exact" })
      .or(`and(${conditions.join(",")})`)
      .range(offset, offset + productsPerPage - 1)
      .order(price ? "price" : "created_at", { ascending: false });
    
    else res = await supabase
      .from("products")
      .select("*, category(*)", { count: "exact" })
      .or(`and(${conditions.join(",")})`)
      .order(price ? "price" : "created_at", { ascending: false });
  } else {
    if (offset !== undefined) res = await supabase
      .from("products")
      .select("*, category(*)", { count: "exact" })
      .range(offset, offset + productsPerPage - 1)
      .order("created_at", { ascending: false });
    
    else res = await supabase
      .from("products")
      .select("*, category(*)", { count: "exact" })
      .order("created_at", { ascending: false });
  }

  const { data, count, error, status, statusText } = res
    
  if (error) { 
    console.log(error)
    return NextResponse.json(null, { status, statusText });
  }

  return NextResponse.json({
    data,
    count
  })
}

export const POST = async (req: NextRequest) => {
  const supabase = createClient()

  const formData = await req.formData()

  const values: FormDataEntries = {
    ...Object.fromEntries(formData),
    images: formData.getAll("images"),
  };

  const { data, error: parseErrorr } = productSchema.safeParse(values);

  if (parseErrorr) {
    console.log(parseErrorr);
    return NextResponse.json(null, {
      status: 400,
      statusText: "Invalid form data",
    });
  }

  let images = await Promise.all((data.images as File[]).map(async (image) => {
    const { data, error } = await supabase.storage
      .from("products")
      .upload(`public/${image.name}`, image)

    if (error) {
      console.log(error)
      return ''
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from("products")
      .getPublicUrl(`public/${image.name}`)
    
    return publicUrl
  }))

  images = images.filter((image) => image !== '')

  const { error, status, statusText } = await supabase
    .from("products")
    .insert({ ...data, images })
  
  if (error) { 
    console.log(error)
    return NextResponse.json(null, { status, statusText });
  }

  revalidatePath('/')

  return NextResponse.json(null, { status: 201 })
}