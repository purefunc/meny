import Link from "next/link";

import { Package2, PanelLeft, Settings } from "lucide-react";

import { APP_NAME } from "@/app/constants";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { routes } from "./side-nav";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">{APP_NAME}</span>
          </Link>
          {routes.map(({ label, href, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              {icon}
              {label}
            </Link>
          ))}
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
