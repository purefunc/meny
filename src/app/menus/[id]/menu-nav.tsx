import Link from "next/link";
import { useCallback } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MenuNav({ categories }) {
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <nav className="hidden h-full rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground md:block">
      <div className="grid gap-2">
        <Link href="#details" onClick={(e) => handleLinkClick(e, "details")}>
          Details
        </Link>

        <Link
          href="#categories"
          className="mt-1"
          onClick={(e) => handleLinkClick(e, "categories")}
        >
          Categories
        </Link>
        <div className="ml-2">
          <Accordion type="multiple" className="w-full">
            {categories.map((category, index) => (
              <AccordionItem key={category.id + index} value={category.id}>
                <div className="flex items-center">
                  <Link
                    href={`#${category.id}`}
                    className="flex-grow py-2 text-sm hover:underline"
                    onClick={(e) => handleLinkClick(e, category.id)}
                  >
                    {category.name || `Category ${index + 1}`}
                  </Link>
                  <AccordionTrigger className="flex-shrink-0 p-2" />
                </div>
                <AccordionContent>
                  <div className="grid gap-1 pl-4">
                    {category?.menuItems?.map((item, inx) => (
                      <Link
                        key={item.id + inx}
                        href={`#${item.id}`}
                        className="py-1 text-sm"
                        onClick={(e) => handleLinkClick(e, item.id)}
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
        <Link href="#footer" onClick={(e) => handleLinkClick(e, "footer")}>
          Menu Footer
        </Link>
      </div>
    </nav>
  );
}
