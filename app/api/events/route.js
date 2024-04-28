import supabase from "@/config/Supabase_Client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  try {
    const authHeader = headers().get("authorization");
    const { name, domain } = await req.json();
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const apiKey = authHeader.split("Bearer ")[1];
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("api", apiKey);
      if (data.length > 0) {
        const { data: events, error: errorMessage } = await supabase
          .from("events")
          .insert([
            {
              event_name: name,
              website_id: domain,
            },
          ]);
        if (errorMessage) {
          return NextResponse.json(
            { error: errorMessage },
            { status: 400 },
            { headers: corsHeaders }
          );
        } else {
          return NextResponse.json(
            { message: "success" },
            { status: 200 },
            { headers: corsHeaders }
          );
        }
      }
    } else {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
      { headers: corsHeaders }
    );
  }
}
