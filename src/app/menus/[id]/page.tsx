import { notFound } from "next/navigation";

import db from "@/db";

interface MenuIdPageProps {
  params: { id: string };
}

export default async function MenuIdPage({ params }: MenuIdPageProps) {
  const menuId = params.id;

  const menu = await db.query.menus.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, menuId);
    },
  });

  if (!menu) {
    notFound();
  }

  return (
    <div>
      <h1>{menu.name}</h1>
    </div>
  );
}
