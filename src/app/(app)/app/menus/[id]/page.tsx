import { notFound } from "next/navigation"
import db from "@/db"
import MenuClient from "./page.client"
import { createClient } from "@/utils/supabase/server"

interface MenuIdPageProps {
  params: { id: string }
}

export default async function MenuIdPage({ params }: MenuIdPageProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const menu = await db.query.menus.findFirst({
    where: (menus, { eq, and }) => and(eq(menus.id, params.id), eq(menus.userId, user.id)),
    with: {
      categories: {
        with: {
          menuItems: true,
        },
      },
    },
  })

  if (!menu) {
    notFound()
  }

  return <MenuClient menu={menu} />
}
