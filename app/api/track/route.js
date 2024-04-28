import supabase from "@/config/Supabase_Client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json();
  const { domain, url, event, source } = res;
  if (!url.includes(domain))
    return NextResponse.json({
      error:
        "the script points to a different domain than the current url. make sure thy match",
    });

  if (event == "session_start") {
    // adding new row to log a new visit with its source
    await supabase
      .from("visits")
      .insert([{ website_id: domain, source: source ?? "Direct" }])
      .select();
  }

  if (event == "pageview") {
    await supabase.from("page_views").insert([{ domain, page: url }]);
  }
  return NextResponse.json({ res });
}
