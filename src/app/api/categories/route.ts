import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => { 
  const supabase = createClient()

  const { data, error } = await supabase
    .from("category")
    .select("*")
    .order("name", { ascending: false });
  
  if (error) { 
    console.log(error)
    return NextResponse.json(
      null,
      { status: Number(error.code), statusText: error.message }
    );
  }

  return NextResponse.json(data)
}

export const POST = async (req: NextRequest) => { 
  const supabase = createClient()

  const body = await req.json()

  const { error } = await supabase
    .from("category")
    .insert(body)
  
  if (error) { 
    console.log(error)
    return NextResponse.json(
      null,
      { status: Number(error.code), statusText: error.message }
    );
  }

  return NextResponse.json(null, { status: 201 })
}