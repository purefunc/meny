"use client";

import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function AuthButton() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Button disabled className="w-full">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sign In
      </Button>
    );
  }

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/login",
      });

    return <DropdownMenuItem onClick={signOutClick}>Sign Out</DropdownMenuItem>;
  }

  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/menus",
        })
      }
    >
      Sign In
    </Button>
  );
}
