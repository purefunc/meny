import Link from "next/link";

import { ChefHat, PanelLeft, Settings } from "lucide-react";

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
          <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-lg font-semibold text-primary md:h-8 md:w-8 md:text-base">
            <ChefHat className="h-6 w-6" />
            <span className="sr-only">{APP_NAME}</span>
          </div>
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
            href="/settings"
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
