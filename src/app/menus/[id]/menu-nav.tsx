import Link from "next/link";
import { useCallback } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MenuNav({
  categories,
  openCategoryAccordions,
  toggleCategoryAccordion,
}) {
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      console.log("targetId", targetId);
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      console.log("targetElement", targetElement);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <nav className="hidden h-full rounded-lg bg-muted/40 p-6 text-base text-muted-foreground md:block">
      <div className="grid gap-2">
        <Link
          href="#details"
          onClick={(e) => handleLinkClick(e, "details")}
          className="py-1 text-base"
        >
          Details
        </Link>

        <Link
          href="#categories"
          className="py-1 text-base"
          onClick={(e) => handleLinkClick(e, "categories")}
        >
          Categories
        </Link>
        <div className="ml-2">
          <Accordion
            type="multiple"
            className="w-full"
            value={openCategoryAccordions}
            onValueChange={toggleCategoryAccordion}
          >
            {categories.map((category, index) => (
              <AccordionItem
                key={`category-${index}`}
                value={`category-${index}`}
              >
                <div className="flex items-center">
                  <Link
                    href={`#category-${index}`}
                    className="flex-grow py-2 text-base"
                    onClick={(e) => handleLinkClick(e, `category-${index}`)}
                  >
                    {category.name || `Category ${index + 1}`}
                  </Link>
                  <AccordionTrigger className="flex-shrink-0 p-2" />
                </div>
                <AccordionContent>
                  <div className="grid gap-2 pl-4">
                    {category?.menuItems?.map((item, inx) => (
                      <Link
                        key={`#item-${item.id}-${inx}`}
                        href={`#item-${index}-${inx}`}
                        className="py-1 text-base"
                        onClick={(e) =>
                          handleLinkClick(e, `item-${index}-${inx}`)
                        }
                      >
                        {item.name || `Item ${inx + 1}`}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Link
          href="#footer"
          onClick={(e) => handleLinkClick(e, "footer")}
          className="mt-2 py-1 text-base"
        >
          Menu Footer
        </Link>
      </div>
    </nav>
  );
}
