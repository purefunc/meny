"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChefHat, Home, Settings } from "lucide-react";

import { APP_NAME } from "@/app/constants";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const routes = [
  // {
  //   label: "Home",
  //   href: "/",
  //   icon: <Home className="h-5 w-5" />,
  // },
  {
    label: "Menus",
    href: "/menus",
    // icon: <BookOpenText className="h-5 w-5" />,
    icon: <Home className="h-5 w-5" />,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="bg-black-950 fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-lg font-semibold text-primary md:h-8 md:w-8 md:text-base">
          <ChefHat className="h-6 w-6" />
          <span className="sr-only">{APP_NAME}</span>
        </div>
        {routes.map(({ label, href, icon }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href))
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {icon}
                <span className="sr-only">{label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
