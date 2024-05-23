/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import supabase from "@/config/Supabase_Client";
import React, { useEffect } from "react";
import Wrapper from "../comps/Wrapper";
import { redirect, useRouter } from "next/navigation";
import Logo from "../comps/Logo";
import Image from "next/image";

function SignInPage() {
  const router = useRouter();
  //   signin the user with google provider
  const signIn = async () => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;

      // Check if hostname is localhost to determine protocol
      const redirectTo =
        hostname === "localhost"
          ? `${protocol}//${hostname}:3000/dashboard`
          : `${protocol}//${hostname}/dashboard`;
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo,
        },
      });
    }
  };
  //   check if the user is logged in already and redirect if necassary
  const catchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (user.role === "authenticated") redirect("/dashboard");
    }
  };
  useEffect(() => {
    if (!supabase) return;
    catchUser();
  }, [supabase]);

  return (
    <Wrapper>
      <div className="min-h-screen items-center justify-center flex flex-col w-full z-50 space-y-12">
        <span className="border-b border-white/5 w-full items-center justify-center flex py-6">
          <Logo />
        </span>
        <button
          onClick={signIn}
          className="button flex items-center justify-center space-x-5"
        >
          <p className="text-lg"> signIn with </p>
          <Image height={20} width={20} src="/google.png" alt="google" />
        </button>
      </div>
    </Wrapper>
  );
}

export default SignInPage;
