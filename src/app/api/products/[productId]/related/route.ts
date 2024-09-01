import { baseUrl } from "@/lib/constants";
import { Product } from "@/lib/types";
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  const supabase = createClient();

  const res = await fetch(`${baseUrl}/api/products/${params.productId}`);

  if (!res.ok) {
    return NextResponse.json(null, { status: res.status, statusText: res.statusText });
  }

  const product = await res.json() as Product

  const { data, error, status, statusText } = await supabase
    .from("products")
    .select("*, category(*)")
    .eq("category.id", product.category.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.log(error);
    return NextResponse.json(null, { status, statusText });
  }

  return NextResponse.json(data);
};
