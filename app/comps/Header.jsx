/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Logo from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";

function Header() {
  const [user] = useUser();
  return (
    <div
      className="w-full border-b border-white/5 sticky top-0 bg-black z-50
      bg-opacity-20 filter backdrop-blur-lg flex items-center justify-between px-6 py-3"
    >
      <Logo size="sm" />
      {/* profile */}
      <DropdownMenu>
        <DropdownMenuTrigger className="text-white outline-none p-0 m-0 border-none">
          <div className="flex space-x-2 items-center justify-center hover:opacity-50">
            <p className="text-sm">
              {user?.user_metadata.full_name.split(" ")[0]}
            </p>
            <img
              className="h-8 w-8 rounded-full"
              src={user?.user_metadata.avatar_url}
              s
              alt="name"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-[#0a0a0a] border-white/5 outline-none
           text-white bg-opacity-20 backdrop-blur-md filter"
        >
          <DropdownMenuLabel className="text-white">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/5" />
          <DropdownMenuItem
            className="text-white/60
             smooth cursor-pointer rounded-md"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white/60
             smooth cursor-pointer rounded-md"
          >
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white/60
             smooth cursor-pointer rounded-md"
          >
            Team
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white/60
             smooth cursor-pointer rounded-md"
          >
            Subscription
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
