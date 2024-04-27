import supabase from "@/config/Supabase_Client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json();
  const { domain, url, event, sessionId } = res;
  if (!url.includes(domain))
    return NextResponse.json({
      error:
        "the script points to a different domain than the current url. make sure thy match",
    });
  // 1. store the sessionId
  // 2. check if we have a sessionId or not
  // 3. if not then it is a new visit and store it
  // 4. if yes then it is the same visit
  const { data, error } = await supabase
    .from("websites")
    .select()
    .eq("website_name", domain);

  if (event == "session_start") {
    await supabase
      .from("websites")
      .update({ total_visits: data[0].total_visits + 1 })
      .eq("website_name", domain)
      .select();
  }

  if (event == "pageview") {
    await supabase.from("page_views").insert([{ domain, page: url }]);
  }
  return NextResponse.json({ res });
}
