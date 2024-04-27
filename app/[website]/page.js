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
  const [pageViews, setPageViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchViews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_views")
      .select()
      .eq("domain", website);
    setPageViews(data);
    setLoading(false);
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
      data.length == 0
        ? router.push("/dashboard")
        : setTimeout(() => {
            fetchViews();
          }, 500);
    };
    checkWebsiteCurrentUser();
  }, [user]);
  const abbreviateNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  };
  if (loading) {
    return (
      <Wrapper>
        <div className="min-h-screen w-full items-center justify-center flex text-white">
          loading...
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {pageViews.length == 0 && !loading ? (
        <div
          className="w-full items-center justify-center flex
         flex-col space-y-6 z-40 relative min-h-screen px-4"
        >
          <div
            className="z-40 w-full lg:w-2/3 bg-black border border-white/5 py-12 px-8 
        items-center justify-center flex flex-col text-white space-y-4 relative"
          >
            <p className="bg-green-600 rounded-full p-4 animate-pulse" />
            <p className="animate-pulse">waiting for the first page view</p>
            <button className="button" onClick={() => window.location.reload()}>
              refresh
            </button>
          </div>
          <div className="w-3/4 md:w-[50%] z-40 fixed bottom-4">
            <textarea
              type="text"
              className="input text-white/20 cursor-pointer"
              disabled
              value={`<script defer data-domain="${website}" src="http://localhost:3000/tracking-script.js"></script>`}
            />
            <p className="text-xs text-white/20 pt-2 font-light">
              Paste this snippet in the{" "}
              <b className="text-red-600">{"<head>"}</b> of your website.
            </p>
          </div>
        </div>
      ) : (
        // let's monitor
        <div className="z-40 w-full min-h-screen py-6 px-6 items-center justify-start flex flex-col">
          <button
            className="fixed z-50 top-3 right-3 text-white"
            onClick={fetchViews}
          >
            refresh
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
            <div className="bg-black border-white/5 border text-white text-center">
              <p className="font-bold py-4  w-full text-center border-b border-white/5">
                TOTAL VISITS
              </p>
              <p className="py-8 text-3xl bg-[#050505]">
                {abbreviateNumber(pageViews?.length)}
              </p>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default WebsitePage;
