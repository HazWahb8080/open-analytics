/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../comps/Wrapper";
import Header from "../comps/Header";
import supabase from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { sunburst } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
  // const url = "http://localhost:3000/api/events";

  const url = "https://monitoryour.website/api/events";
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
           bg-black space-y-12 py-12 w-full md:w-3/4 lg:w-1/2"
          >
            <div className="space-y-12 px-4">
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
            <div className="space-y-4 border-t border-white/5 bg-black p-6">
              <h1 className="text-lg p-4 bg-[#0f0f0f70]">
                You can create custom events using our api like below
              </h1>
              <div className="">
                <CodeComp />
              </div>
            </div>
          </div>
        )}
        {/* <button onClick={sendRequest}>send</button> */}
      </div>
    </Wrapper>
  );
}

export default SettingsPage;

export const CodeComp = () => {
  let codeString = `
 const url = "https://monitoryour.website/api/events";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer {{apiKey}}",
  };
  const eventData = {
    name: "",//* required
    domain: "", //* required
    description: "",//optional
  };

  const sendRequest = async () => {
    axios
      .post(url, eventData, { headers })
      .then()
      .catch((error) => {
        console.error("Error:", error);
      });
  };`;
  return (
    <SyntaxHighlighter language="javascript" style={sunburst}>
      {codeString}
    </SyntaxHighlighter>
  );
};
