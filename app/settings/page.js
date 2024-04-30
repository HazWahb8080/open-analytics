/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../comps/Wrapper";
import Header from "../comps/Header";
import supabase from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";

function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [user] = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    if (user == "no user") router.push("/signin");
  }, [user]);

  const generateApiKey = async () => {
    setLoading(true);
    if (loading || !user) return;
    const randomString =
      Math.random().toString(36).substring(2, 300) +
      Math.random().toString(36).substring(2, 300);
    const { data, error } = await supabase
      .from("users")
      .insert([{ api: randomString, user_id: user.id }])
      .select();
    if (error) console.log(error);
    setApiKey(randomString);
    setLoading(false);
  };

  const getUserAPIs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id);
    if (data.length > 0) {
      setApiKey(data[0].api);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!supabase || !user) return;
    getUserAPIs();
  }, [user, supabase]);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API key copied to clipboard!");
  };
  // const url = "https://openanalytics.hazembuilds.com/api/events";
  const url = "http://localhost:3000/api/events";

  // Example headers (including the API key)
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const eventData = {
    name: "Signups",
    domain: "dashboard-3-beta.vercel.app",
    description: `user  ${user?.email} just signed up `,
  };

  const sendRequest = async () => {
    axios
      .post(url, eventData, { headers })
      .then()
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (user == "no user") {
    <Wrapper>
      <Header />
      <div className="min-h-screen items-center justify-center flex flex-col w-full z-40 text-white">
        Redirecting....
      </div>
    </Wrapper>;
  }
  if (loading) {
    return (
      <Wrapper>
        <Header />
        <div className="min-h-screen items-center justify-center flex flex-col w-full z-40 text-white">
          loading....
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Header />
      <div className="min-h-screen items-center justify-center flex flex-col w-full z-40 text-white">
        {!apiKey && !loading && (
          <button className="button" onClick={generateApiKey}>
            Generate API Key
          </button>
        )}
        {apiKey && (
          <div
            className="mt-12 border-white/5 border
           bg-black space-y-5 py-12 px-4 w-full md:w-3/4 lg:w-1/2"
          >
            <p>Your API Key:</p>
            <input
              className="input-disabled"
              type="text"
              value={apiKey}
              readOnly
              disabled
            />
            <button onClick={copyApiKey} className="button">
              Copy API Key
            </button>
          </div>
        )}
        <button onClick={sendRequest}>send</button>
      </div>
    </Wrapper>
  );
}

export default SettingsPage;
