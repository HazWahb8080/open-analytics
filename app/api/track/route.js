import supabase from "@/config/Supabase_Client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json();
  const { domain, url } = res;
  await supabase.from("page_views").insert([{ domain, page: url }]);
  const { data: page_views, error } = await supabase
    .from("websites")
    .select()
    .eq("website_name", domain);
  await supabase
    .from("websites")
    .update({ total_views: page_views[0].total_views + 1 })
    .eq("website_name", domain)
    .select();
  return NextResponse.json({ res });
}
