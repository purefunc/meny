"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MenuSchema } from "@/db/schema/menus";

import MenuForm from "../menu-form";
import MenuMobileNav from "./menu-mobile-nav";
import MenuNav from "./menu-nav";
import MenuPreview from "./menu-preview";

export default function MenuClient({ menu }) {
  const form = useForm<z.infer<typeof MenuSchema>>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      id: menu.id,
      name: menu?.name || "",
      description: menu?.description || "",
      image: menu?.image || "",
      notes: menu?.notes || "",
      isPublic: menu?.isPublic || false,
      message: menu?.message || "",
      categories:
        menu?.categories?.length > 0
          ? menu.categories.map((category) => ({
              id: category.id,
              name: category.name,
              description: category.description,
              isHidden: category.isHidden,
              image: category.image,
              notes: category.notes,
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
                notes: "",
                menuItems: [
                  {
                    id: undefined,
                    name: "",
                    description: "",
                    price: "",
                    isHidden: false,
                    isSeasonal: false,
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

  return (
    <div className="flex h-[calc(100vh_-_theme(spacing.16))] flex-col">
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">{menu.name || "Edit Menu"}</h1>
          <Badge variant={menu.isPublic ? "default" : "outline"}>
            {menu.isPublic ? (
              <Eye className="mr-2 h-4 w-4" />
            ) : (
              <EyeOff className="mr-2 h-4 w-4" />
            )}
            {menu.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>{menu.isPublic ? "Unpublish Menu" : "Publish Menu"}</Button>
        </div>
      </div>
      <div className="grid w-full flex-grow grid-cols-1 gap-4 overflow-hidden md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr_375px]">
        <div className="flex flex-col">
          <MenuMobileNav categories={formData.categories} />
          <div className="hidden md:block">
            <MenuNav categories={formData.categories} />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden">
          <Card className="flex h-full flex-col">
            <MenuForm form={form} />
          </Card>
        </div>
        <div className="flex flex-grow flex-col overflow-hidden">
          <MenuPreview menu={formData} />
        </div>
      </div>
    </div>
  );
}
