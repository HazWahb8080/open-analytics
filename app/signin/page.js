/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import supabase from "@/config/Supabase_Client";
import React, { useEffect } from "react";
import Wrapper from "../comps/Wrapper";
import { useRouter } from "next/navigation";

function SignInPage() {
  const router = useRouter();
  //   signin the user with google provider
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: { redirectTo: `https://${window.location.hostname}/dashboard` },
    });
  };
  //   check if the user is logged in already and redirect if necassary
  const catchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (user.role === "authenticated") router.push("/dashboard");
    }
  };
  useEffect(() => {
    if (!router || !supabase) return;
    catchUser();
  }, [router, supabase]);

  return (
    <Wrapper>
      <div className="min-h-screen items-center justify-center flex flex-col w-full z-50">
        <button onClick={signIn} className="button">
          signIn
        </button>
      </div>
    </Wrapper>
  );
}

export default SignInPage;
