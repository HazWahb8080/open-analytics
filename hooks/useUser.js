"use client";
import supabase from "@/config/Supabase_Client";
import React, { useEffect, useState } from "react";

function useUser() {
  const [currentUser, setCurrentUser] = useState();
  const catchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user ?? "no user");
  };
  useEffect(() => {
    if (!supabase) return;
    catchUser();
  }, [supabase]);
  return [currentUser];
}

export default useUser;
