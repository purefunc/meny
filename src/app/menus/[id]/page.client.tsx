"use client";

import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Card } from "@/components/ui/card";
import { MenuSchema } from "@/db/schema/menus";
import { cn } from "@/lib/utils";

import MenuForm from "./menu-form";
import MenuMobileNav from "./menu-mobile-nav";
import MenuNav from "./menu-nav";
import MenuPreview from "./menu-preview";
import PublishButton from "./publish-button";

export default function MenuClient({ menu }) {
  const form = useForm<z.infer<typeof MenuSchema>>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      id: menu.id,
      name: menu?.name || "",
      description: menu?.description || "",
      image: menu?.image || "",
      notes: menu?.notes || [""],
      message: menu?.message || "",
      categories:
        menu?.categories?.length > 0
          ? menu.categories.map((category) => ({
              id: category.id,
              name: category.name,
              description: category.description,
              isHidden: category.isHidden,
              image: category.image,
              notes: category.notes || [""],
              menuItems:
                category?.menuItems?.length > 0
                  ? category.menuItems.map((item) => ({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      isHidden: item.isHidden,
                      image: item.image,
                      tags: item.tags,
                      posId: item.posId,
                    }))
                  : [
                      {
                        id: undefined,
                        name: "",
                        description: "",
                        price: "",
                        isHidden: false,
                        image: "",
                        posId: "",
                        tags: [],
                      },
                    ],
            }))
          : [
              {
                id: undefined,
                name: "",
                description: "",
                isHidden: false,
                image: "",
                notes: [""],
                menuItems: [
                  {
                    id: undefined,
                    name: "",
                    description: "",
                    price: "",
                    isHidden: false,
                    image: "",
                    posId: "",
                    tags: [],
                  },
                ],
              },
            ],
    },
  });

  const formData = useWatch({ control: form.control });

  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  return (
    <div className="flex h-[calc(100vh_-_theme(spacing.16))] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">{menu.name || "Edit Menu"}</h1>
          <Badge variant={menu.isPublic ? "default" : "outline"}>
            {menu.isPublic ? (
              <Eye className="h-4 w-4 sm:mr-2" />
            ) : (
              <EyeOff className="h-4 w-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">
              {menu.isPublic ? "Public" : "Private"}
            </span>
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {menu.isPublic && (
            <Button asChild variant="outline">
              <Link href={`/menu/${menu.id}`} target="_blank">
                View Menu
              </Link>
            </Button>
          )}
          <div className="lg:hidden">
            <Dialog
              open={showPreviewDialog}
              onOpenChange={setShowPreviewDialog}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Preview</span>
                </Button>
              </DialogTrigger>
              <DialogContent
                className={cn(
                  "border-none p-0",
                  "h-screen max-h-screen w-screen sm:h-auto sm:w-auto sm:max-w-[425px]",
                  "bg-transparent sm:bg-white",
                  "[&>button]:rounded-full [&>button]:bg-red-500 [&>button]:text-white",
                  "[&>button]:transition-colors [&>button]:hover:bg-red-600",
                  "[&>button_svg]:h-6 [&>button_svg]:w-6",
                  "[&>button]:absolute [&>button]:right-1 [&>button]:top-1 sm:[&>button]:right-2 sm:[&>button]:top-2",
                  "[&>button]:z-50 [&>button]:opacity-100",
                  "[&>button]:p-1 sm:[&>button]:p-2"
                )}
              >
                <div className="flex h-full items-center justify-center sm:block sm:h-auto">
                  <MenuPreview menu={formData} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <PublishButton menu={menu} />
        </div>
      </div>
      <div className="grid w-full flex-grow grid-cols-1 overflow-hidden md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr_375px]">
        <div className="flex flex-col">
          <MenuMobileNav categories={formData.categories} />
          <MenuNav categories={formData.categories} />
        </div>

        <div className="flex flex-col overflow-y-auto">
          {/* <Card className="flex h-full flex-col"> */}
          <MenuForm form={form} />
          {/* </Card> */}
        </div>
        <div className="hidden lg:flex lg:flex-col">
          <MenuPreview menu={formData} />
        </div>
      </div>
    </div>
  );
}
