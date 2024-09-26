import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MenuNav({ categories }) {
  return (
    <nav className="hidden gap-2 text-sm text-muted-foreground md:grid">
      <Link href="#general">General</Link>

      <Link href="#categories" className="mt-1">
        Categories
      </Link>
      <Accordion type="multiple" className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <div className="flex items-center">
              <Link
                href={`#${category.id}`}
                className="flex-grow py-2 text-sm hover:underline"
              >
                {category.name}
              </Link>
              <AccordionTrigger className="flex-shrink-0 p-2" />
            </div>
            <AccordionContent>
              <div className="grid gap-1 pl-4">
                {category.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className="py-1 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Link href="#footer">Menu Footer</Link>
    </nav>
  );
}
