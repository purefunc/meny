import type { Metadata } from "next";
import { Suspense } from "react";

import Nav from "@/components/layout/nav";
import Providers from "@/components/providers";

import { APP_DESCRIPTION, APP_NAME } from "./constants";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📖</text></svg>"
        />
      </head>
      <body className="h-screen w-screen">
        <Providers>
          <Nav>
            <main className="mx-auto grid w-full max-w-[1440px] flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Suspense>{children}</Suspense>
            </main>
          </Nav>
        </Providers>
      </body>
    </html>
  );
}
