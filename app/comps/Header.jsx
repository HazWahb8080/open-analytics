/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
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
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import supabase from "@/config/Supabase_Client";

function Header() {
  const [user] = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  if (user == "no user") {
    return <></>;
  }

  return (
    <div
      className="w-full border-b border-white/5 sticky top-0 bg-black z-50
      bg-opacity-20 filter backdrop-blur-lg flex items-center justify-between px-6 py-3"
    >
      <Logo size="sm" />
      {/* profile */}
      <div className="flex space-x-6">
        {pathname !== "/dashboard" && (
          <Link
            prefetch
            href="/dashboard"
            className="flex items-center justify-center space-x-2 group smooth"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-white/60 group-hover:stroke-white smooth" />
            <button className="text-sm text-white/60 group-hover:text-white smooth">
              dashboard
            </button>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white outline-none p-0 m-0 border-none">
            <div className="flex space-x-2 items-center justify-center hover:opacity-50">
              <p className="text-sm">
                {user?.user_metadata.full_name.split(" ")[0]}
              </p>
              <img
                className="h-8 w-8 rounded-full"
                src={user?.user_metadata.avatar_url}
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
            <Link href="/settings" prefetch>
              <DropdownMenuItem
                className="text-white/60
             smooth cursor-pointer rounded-md"
              >
                settings
              </DropdownMenuItem>
            </Link>

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
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem
              onClick={logOut}
              className="text-white/60
             smooth cursor-pointer rounded-md"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
