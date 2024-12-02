export const runtime = "edge"

import { notFound } from "next/navigation"
import db from "@/db"
import Menu from "./menu"

interface MenuIdPageProps {
  params: { id: string }
}

export default async function MenuPage({ params }: MenuIdPageProps) {
  const menuId = params.id

  try {
    const menu = await db.query.menus.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, menuId)
      },
      with: {
        categories: {
          with: {
            menuItems: true,
          },
        },
      },
    })

    if (!menu || !menu.isPublic) {
      notFound()
    }

    return <Menu menu={menu} />
  } catch (error) {
    console.error("error", error)
    // If there's any error (including invalid ID), call notFound()
    notFound()
  }
}
