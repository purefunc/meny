"use client";

import Link from "next/link";
import { useState } from "react";

import { menuItemTags } from "@/app/menus/menu-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="mx-auto max-w-screen-lg">
          <Accordion type="multiple" className="w-full">
            {menu.categories
              .filter(({ isHidden }) => !isHidden)
              .map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="text-left">
                    <div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      {category.description && (
                        <p className="text-gray-600">{category.description}</p>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">
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

                      {category.menuItems
                        .filter(({ isHidden }) => !isHidden)
                        .map((item) => (
                          <div key={item.id} className="mb-4">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-semibold">
                                {item.name}
                              </h3>
                              <span>{item.price && `$${item.price}`}</span>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
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
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
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
      </main>

      <footer className="mt-4">
        <div className="mx-auto max-w-screen-lg">
          <div className="flex flex-col gap-3 p-4">
            {filteredMenuItemTags.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-3">
                {filteredMenuItemTags
                  .filter((tag) => !!tag?.key)
                  .map((tag) => (
                    <li key={tag.value} className="text-xs">
                      <strong> {tag.label}</strong> {tag.key}
                    </li>
                  ))}
              </ul>
            )}
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
