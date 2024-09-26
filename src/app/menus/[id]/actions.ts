"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { eq } from "drizzle-orm";

import db from "@/db";
import { UpdateMenuSchema, menus } from "@/db/schema/menus";
import requireAuth from "@/utils/require-auth";

export async function updateMenu(prevState: unknown, formData: FormData) {
  await requireAuth();
  const submission = parseWithZod(formData, {
    schema: UpdateMenuSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { id, ...updateData } = submission.value;

  await db
    .update(menus)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(menus.id, id));

  revalidatePath(`/menus/${id}`);
  redirect(`/menus/${id}`);
}
