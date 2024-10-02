import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import options from "@/config/auth";
import db from "@/db";

import MenuClient from "./page.client";

interface MenuIdPageProps {
  params: { id: string };
}

export default async function MenuIdPage({ params }: MenuIdPageProps) {
  const session = await getServerSession(options);

  const menu = await db.query.menus.findFirst({
    where: (menus, { eq, and }) =>
      and(eq(menus.id, params.id), eq(menus.userId, session.user.id)),
    with: {
      categories: {
        with: {
          menuItems: true,
        },
      },
    },
  });

  if (!menu) {
    notFound();
  }

  return <MenuClient menu={menu} />;
}
