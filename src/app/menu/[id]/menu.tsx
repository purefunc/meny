"use client";

import Link from "next/link";
import { useState } from "react";

import { menuItemTags } from "@/app/menus/menu-form";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function Menu({ menu }) {
  const defaultCategory = menu.categories[0]?.id || "";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // Create a Set of all unique tags used in the menu
  const usedTags = new Set(
    menu.categories
      .flatMap((category) => category.menuItems)
      .flatMap((item) => item.tags)
  );

  // Filter menuItemTags to only include tags that are used
  const filteredMenuItemTags = menuItemTags.filter((tag) =>
    usedTags.has(tag.value)
  );

  // Function to get label from tag value
  const getTagLabel = (tagValue: string) => {
    const tag = filteredMenuItemTags.find((t) => t.value === tagValue);
    return tag ? tag.label : tagValue;
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll to the selected category
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 bg-background p-4 shadow-md">
        <div className="@container mx-auto flex max-w-screen-lg flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">{menu.name}</h1>
          {menu.categories.length > 1 && (
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="@md:max-w-sm"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {menu.categories.map((category) => (
                  <SelectItem
                    key={`${category.id}-${category.name}`}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="mx-auto max-w-screen-lg">
          {menu.categories
            .filter(({ isHidden }) => !isHidden)
            .map((category) => (
              <div key={category.id} className="mb-8 flex flex-col gap-6">
                <div>
                  <h2 className="mb-1 text-2xl font-bold">{category.name}</h2>
                  {category.description && (
                    <p className="mb-1 text-gray-600">{category.description}</p>
                  )}
                  {category.notes
                    .filter((note) => !!note)
                    .map((note, index) => (
                      <p
                        className="text-xs italic text-muted-foreground"
                        key={`cat-${index}`}
                      >
                        * {note}
                      </p>
                    ))}
                </div>

                {category.menuItems
                  .filter(({ isHidden }) => !isHidden)
                  .map((item) => (
                    <div key={item.id} className="mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span>{item.price && `$${item.price}`}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {getTagLabel(tag)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        {menu.notes
          .filter((note) => !!note)
          .map((note, index) => (
            <p
              className="mt-2 text-xs italic text-muted-foreground"
              key={`menu-${index}`}
            >
              * {note}
            </p>
          ))}

        {filteredMenuItemTags.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {filteredMenuItemTags.map((tag) => (
              <li key={tag.value} className="text-xs">
                {tag.label} {tag.key}
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mt-4">
        <div className="mx-auto max-w-screen-lg">
          <div className="p-4">
            <p className="text-center text-xs text-muted-foreground">
              {menu.message}
            </p>
          </div>
          <Separator />
          <div className="p-2 text-center text-sm">
            Powered By <Link href="/">Meny</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
