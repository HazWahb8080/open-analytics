/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../comps/Wrapper";
import supabase from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Logo from "../comps/Logo";

function OnBoardingPage() {
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useUser();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [error, setError] = useState("");

  const addWebsite = async () => {
    if (website.trim() == "" || loading) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("websites")
      .insert([{ website_name: website.trim(), user_id: user.id }])
      .select();
    setLoading(false);
    setStep(2);
  };
  const checkDomainAddedBefore = async () => {
    let fetchedWebites = [];
    const { data: websites, error } = await supabase
      .from("websites")
      .select("*");
    fetchedWebites = websites;

    if (
      fetchedWebites.filter((item) => item.website_name == website).length > 0 // this means we have duplicates
    ) {
      setError("this domain is added before");
    } else {
      addWebsite();
    }
  };

  return (
    <Wrapper>
      <Logo size="lg" />
      <div
        className="items-center justify-center p-12
      flex flex-col w-full z-0 border-y
       border-white/5 bg-black text-white"
      >
        {step == 1 ? (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%] group">
              <p className="text-white/40 pb-4 group-hover:text-white smooth">
                Domain
              </p>
              <input
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value.trim().toLowerCase())
                }
                type="text"
                className="input"
              />
              {error ? (
                <p className="text-xs pt-2 font-light text-red-400">{error}</p>
              ) : (
                <p className="text-xs text-white/20 pt-2 font-light">
                  enter the domain or subdomain without {"www"}
                </p>
              )}
            </span>
            <button className="button" onClick={checkDomainAddedBefore}>
              {loading ? "adding..." : "add website"}
            </button>
          </div>
        ) : (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%]">
              <textarea
                type="text"
                className="input text-white/20 cursor-pointer"
                disabled
                value={`<script defer data-domain="${website}" src="https://openanalytics.hazembuilds.com/tracking-script.js"></script>`}
              />
              <p className="text-xs text-white/20 pt-2 font-light">
                Paste this snippet in the{" "}
                <b className="text-red-600">{"<head>"}</b> of your website.
              </p>
            </span>
            <button
              className="button"
              onClick={() => router.push(`/w/${website.trim()}`)}
            >
              added
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default OnBoardingPage;
