import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MenuPreview({ menu }) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="flex h-full justify-center pt-8">
      <Card className="flex h-[667px] w-[375px] flex-col overflow-y-auto rounded-3xl shadow-lg">
        <CardHeader className="rounded-t-3xl bg-gray-100 text-center dark:bg-gray-800">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {menu.name}
          </CardTitle>
          {menu.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {menu.description}
            </p>
          )}
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto px-4 py-6">
          <Accordion
            type="multiple"
            value={openCategories}
            className="w-full space-y-4"
          >
            {menu.categories.map((category, index) => (
              <AccordionItem
                key={category.id + index}
                value={category.id}
                className="rounded-lg border"
              >
                <AccordionTrigger
                  onClick={() => toggleCategory(category.id)}
                  className="px-4 py-2 hover:no-underline"
                >
                  <span className="text-lg font-semibold">{category.name}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  {category.description && (
                    <p className="mb-4 text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                  <div className="space-y-4">
                    {category.menuItems?.map((item, indx) => (
                      <div key={item.id + indx} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-md font-semibold">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <span className="text-md font-semibold">
                            ${item.price}
                          </span>
                        </div>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        {(menu.notes || menu.message) && (
          <div className="mt-auto border-t p-4 text-sm text-gray-600">
            {menu.notes && <p className="mb-2">{menu.notes}</p>}
            {menu.message && <p>{menu.message}</p>}
          </div>
        )}
      </Card>
    </div>
  );
}
