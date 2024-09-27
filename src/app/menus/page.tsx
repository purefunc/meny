import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import db from "@/db";

import MenusClient from "./page.client";

export default async function MenusPage() {
  const menus = await db.query.menus.findMany({
    orderBy(fields, operators) {
      return operators.desc(fields.createdAt);
    },
  });

  if (menus.length === 0) {
    return (
      <>
        <h1 className="text-3xl">Create Your First Menu</h1>
        <Card className="max-w-xl">
          <CardContent>
            <MenusClient />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Menus</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Menu</DialogTitle>
            </DialogHeader>
            <MenusClient />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4">
        {menus.map((menu) => (
          <Card className="sm:max-w-xl" key={menu.id}>
            <CardHeader className="pb-3">
              <CardTitle>{menu.name}</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                {menu.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={`/menus/${menu.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
