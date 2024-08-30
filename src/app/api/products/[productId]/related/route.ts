import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  const supabase = createClient();

  const { data, error, status, statusText } = await supabase
    .from("products")
    .select("*, category(*)")
    .eq("category.id", params.productId)
    .order("created_at", { ascending: false })
    .limit(10);
  
  if (error) {
    console.log(error);
    return NextResponse.json(null, { status, statusText });
  }
  
  return NextResponse.json(data)
};
