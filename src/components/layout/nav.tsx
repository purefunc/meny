"use client";

import type { Metadata } from "next";

import { useSession } from "next-auth/react";

import SideNav from "@/components/layout/side-nav";
import TopNav from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "Next.js & Postgres Starter App",
  description: "A basic starter for next.js",
};

export default function Nav({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" && <SideNav />}
      <div
        className={`flex flex-col ${
          status === "authenticated"
            ? "flex flex-col sm:gap-4 sm:py-4 sm:pl-14"
            : ""
        }`}
      >
        <TopNav />
        {children}
      </div>
    </>
  );
}
