import supabase from "@/config/Supabase_Client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
          return NextResponse.json({ error: errorMessage }, { status: 400 });
        } else {
          return NextResponse.json({ message: "success" }, { status: 200 });
        }
      }
    } else {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
