"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  LogOut,
} from "lucide-react"

export default function TopBar() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-end bg-blue-600">
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link"><User className="mr-2 h-4 w-4" />{session?.user?.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span className="cursor-pointer" onClick={() => signOut()}>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
