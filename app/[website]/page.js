/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Wrapper from "../comps/Wrapper";
import supabase from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";

function WebsitePage() {
  const { website } = useParams();
  const [user] = useUser();
  const router = useRouter();
  const [pageViews, setPageViews] = useState();
  const fetchViews = async () => {
    const { data, error } = await supabase
      .from("page_views")
      .select()
      .eq("domain", website);
    setPageViews(data);
  };

  useEffect(() => {
    //   make sure the user is loggedin first
    if (!user) return;
    if (user.role !== "authenticated") router.push("/signin");
    const checkWebsiteCurrentUser = async () => {
      // check if the current user is the owner of this website or not
      const { data, error } = await supabase
        .from("websites")
        .select()
        .eq("website_name", website)
        .eq("user_id", user.id);
      // if not go to the dashboard if yeas send other request to get the views
      data.length == 0 ? router.push("/dashboard") : fetchViews();
    };
    checkWebsiteCurrentUser();
  }, [user]);
  return (
    <Wrapper>
      <div className="z-40">
        <h2 className="text-white">{website}</h2>
        <h2 className="text-white">total View is {pageViews?.length}</h2>
        <button onClick={fetchViews} className="button">
          refresh
        </button>
      </div>
    </Wrapper>
  );
}

export default WebsitePage;
