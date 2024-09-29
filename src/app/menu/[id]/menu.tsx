"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Menu({ menu }) {
  const defaultCategory = menu.categories[0]?.id || "";

  return (
    <div className={"min-h-screen bg-gray-100"}>
      <header className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="min-w-40 text-2xl font-bold">{menu.name}</h1>
          <Select defaultValue={defaultCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {menu.categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="p-4">
        {menu.categories.map((category) => (
          <Card key={category.id} className="mb-4">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {category.menuItems.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span>${item.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </main>

      <footer className="bg-gray-200 p-4 text-center text-sm">
        <p>{menu.message || menu.name}</p>
        <span>&copy;{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
