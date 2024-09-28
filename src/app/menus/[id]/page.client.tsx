"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import MenuForm from "../menu-form";
import MenuMobileNav from "./menu-mobile-nav";
import MenuNav from "./menu-nav";

export default function MenuClient({ menu }) {
  return (
    <div className="flex h-[calc(100vh_-_theme(spacing.16))] flex-col">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl font-semibold">{menu.name || "Edit Menu"}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>Publish Menu</Button>
        </div>
      </div>
      <div className="grid w-full flex-grow grid-cols-1 gap-4 overflow-hidden md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="flex flex-col">
          <MenuMobileNav categories={menu.categories} />
          <div className="hidden md:block">
            <MenuNav categories={menu.categories} />
          </div>
        </div>
        <div className="flex max-w-[600px] flex-col overflow-hidden">
          <Card className="flex h-full flex-col">
            <MenuForm menu={menu} />
          </Card>
        </div>
      </div>
    </div>
  );
}
