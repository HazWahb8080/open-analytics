/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import supabase from "@/config/Supabase_Client";
import React, { useEffect } from "react";
import Wrapper from "../comps/Wrapper";
import { useRouter } from "next/navigation";
import Logo from "../comps/Logo";
import Image from "next/image";

function SignInPage() {
  const router = useRouter();
  //   signin the user with google provider
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
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
