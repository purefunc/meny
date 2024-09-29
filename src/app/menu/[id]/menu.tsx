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
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">{menu.name}</h1>
          <Select defaultValue={defaultCategory}>
            <SelectTrigger className="w-full sm:max-w-sm">
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

      <main className="flex-grow p-4">
        <div className="mx-auto max-w-screen-lg">
          {menu.categories
            .filter(({ isHidden }) => !isHidden)
            .map((category) => (
              <Card key={category.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {category.menuItems
                    .filter(({ isHidden }) => !isHidden)
                    .map((item) => (
                      <div key={item.id} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span>${item.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      </main>

      <footer className="bg-gray-200 p-4 text-center text-sm">
        <div className="mx-auto max-w-screen-lg">
          <p>{menu.message || menu.name}</p>
          <span>&copy;{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
