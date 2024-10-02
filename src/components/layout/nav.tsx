"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

import SideNav from "@/components/layout/side-nav";
import TopNav from "@/components/layout/top-nav";
import { Toaster } from "@/components/ui/sonner";

export default function Nav({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMenuPage = pathname.startsWith("/menu/");
  const isLoginPage = pathname.startsWith("/login");

  if (isMenuPage || pathname === "/" || isLoginPage) return children;

  return (
    <>
      <main className="mx-auto grid w-full max-w-[1440px] flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Suspense>
          <SideNav />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <TopNav />
            {children}
          </div>
        </Suspense>
      </main>
      <Toaster />
    </>
  );
}
