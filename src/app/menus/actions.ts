"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { getServerSession } from "next-auth";

import options from "@/config/auth";
import db from "@/db";
import { InsertMenuSchema, menus } from "@/db/schema/menus";
import requireAuth from "@/utils/require-auth";

export async function createMenu(prevState: unknown, formData: FormData) {
  await requireAuth();
  const submission = parseWithZod(formData, {
    schema: InsertMenuSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = (await getServerSession(options))!;

  const [insertedMenu] = await db
    .insert(menus)
    .values({
      userId: session.user.id,
      description: submission.value.description,
      createdAt: new Date(),
      updatedBy: session.user.id,
      name: submission.value.name,
    })
    .returning();

  revalidatePath(`/menus`);
  redirect(`/menus/${insertedMenu.id}`);
}
