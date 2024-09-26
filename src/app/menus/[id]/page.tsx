import { notFound } from "next/navigation";

import db from "@/db";

import MenuClient from "./page.client";

interface MenuIdPageProps {
  params: { id: string };
}

export default async function MenuIdPage({ params }: MenuIdPageProps) {
  const menuId = params.id;

  const menu = await db.query.menus.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, menuId);
    },
    with: {
      categories: true,
    },
  });

  if (!menu) {
    notFound();
  }

  return <MenuClient menu={menu} />;
}
