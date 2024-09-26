import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function MenuMobileNav({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.items.length > 0
      );
  }, [categories, searchQuery]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  }, []);

  return (
    <div className="w-full md:hidden">
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Menu Navigation
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] border border-border bg-background p-2"
          style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
        >
          <div className="mb-2 flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>

          {searchQuery === "" && (
            <DropdownMenuItem asChild>
              <Link
                href="#"
                className="px-2 py-1.5 font-semibold hover:bg-accent"
              >
                General
              </Link>
            </DropdownMenuItem>
          )}

          {filteredCategories.map((category) => (
            <div key={category.id} className="flex w-full flex-col">
              <DropdownMenuItem asChild>
                <Link
                  href={`#${category.id}`}
                  className="px-2 py-1.5 font-semibold hover:bg-accent"
                  onClick={() => handleOpenChange(false)}
                >
                  {category.name}
                </Link>
              </DropdownMenuItem>
              {category.items.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={`#${item.id}`}
                    className="px-4 py-1.5 text-sm hover:bg-accent"
                    onClick={() => handleOpenChange(false)}
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}