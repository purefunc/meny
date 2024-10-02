import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";

// Add this import
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import options from "@/config/auth";
import db from "@/db";

import MenuCard from "./menu-card";
import MenusClient from "./page.client";

export default async function MenusPage() {
  const session = await getServerSession(options);

  const menus = await db.query.menus.findMany({
    where: (menus, { eq }) => eq(menus.userId, session.user.id),
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
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </>
  );
}
