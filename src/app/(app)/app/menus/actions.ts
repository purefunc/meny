"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { parseWithZod } from "@conform-to/zod"
import db from "@/db"
import { InsertMenuSchema, menus } from "@/db/schema/menus"
import requireAuth from "@/utils/require-auth"

export async function createMenu(prevState: unknown, formData: FormData) {
  await requireAuth()
  const submission = parseWithZod(formData, {
    schema: InsertMenuSchema,
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [insertedMenu] = await db
    .insert(menus)
    .values({
      userId: user.id,
      description: submission.value.description,
      createdAt: new Date(),
      updatedBy: user.id,
      name: submission.value.name,
    })
    .returning()

  revalidatePath(`/menus`)
  redirect(`/menus/${insertedMenu.id}`)
}
