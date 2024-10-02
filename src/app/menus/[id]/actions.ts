"use server";

import { revalidatePath } from "next/cache";

import { and, eq, inArray } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { z } from "zod";

import options from "@/config/auth";
import db from "@/db";
import {
  MenuSchema,
  TogglePublishMenuSchema,
  categories,
  menuItems,
  menus,
} from "@/db/schema/menus";
import requireAuth from "@/utils/require-auth";

export async function updateMenu(data: z.infer<typeof MenuSchema>) {
  await requireAuth();

  try {
    const parsed = MenuSchema.safeParse(data);

    if (!parsed.success) {
      console.error("Validation errors:", parsed.error);
      return { success: false, message: "Invalid form data" };
    }

    const { id, categories: inputCategories, ...menuUpdateData } = data;

    const session = (await getServerSession(options))!;

    await db.transaction(async (tx) => {
      // Update menu
      await tx
        .update(menus)
        .set({
          ...menuUpdateData,
          updatedAt: new Date(),
          updatedBy: session.user.id,
        })
        .where(eq(menus.id, id));

      // Get existing categories for this menu
      const existingCategories = await tx
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.menuId, id));

      const existingCategoryIds = new Set(existingCategories.map((c) => c.id));
      const updatedCategoryIds = new Set();

      // Update categories and menu items
      for (const inputCategory of inputCategories) {
        const {
          id: inputCategoryId,
          menuItems: inputMenuItems,
          ...categoryUpdateData
        } = inputCategory;

        let categoryId: string;
        if (inputCategoryId) {
          // Update existing category only if data has changed
          const existingCategory = await tx.query.categories.findFirst({
            where: eq(categories.id, inputCategoryId),
          });

          if (
            existingCategory &&
            hasChanged(existingCategory, categoryUpdateData)
          ) {
            await tx
              .update(categories)
              .set({
                ...categoryUpdateData,
                updatedAt: new Date(),
                updatedBy: session.user.id,
              })
              .where(eq(categories.id, inputCategoryId));
          }
          categoryId = inputCategoryId;
        } else {
          // Insert new category
          const [newCategory] = await tx
            .insert(categories)
            .values({
              ...categoryUpdateData,
              menuId: id,
              updatedAt: new Date(),
              createdAt: new Date(),
              updatedBy: session.user.id,
            })
            .returning({ id: categories.id });
          categoryId = newCategory.id;
        }
        updatedCategoryIds.add(categoryId);

        // Get existing menu items for this category
        const existingMenuItems = await tx
          .select({ id: menuItems.id })
          .from(menuItems)
          .where(eq(menuItems.categoryId, categoryId));

        const existingMenuItemIds = new Set(existingMenuItems.map((m) => m.id));
        const updatedMenuItemIds = new Set();

        // Update or insert menu items
        for (const inputMenuItem of inputMenuItems) {
          const { id: inputMenuItemId, ...menuItemUpdateData } = inputMenuItem;

          if (inputMenuItemId && existingMenuItemIds.has(inputMenuItemId)) {
            // Update existing menu item only if data has changed
            const existingMenuItem = await tx.query.menuItems.findFirst({
              where: eq(menuItems.id, inputMenuItemId),
            });

            if (
              existingMenuItem &&
              hasChanged(existingMenuItem, menuItemUpdateData)
            ) {
              await tx
                .update(menuItems)
                .set({
                  ...menuItemUpdateData,
                  updatedAt: new Date(),
                  updatedBy: session.user.id,
                })
                .where(eq(menuItems.id, inputMenuItemId));
            }
            updatedMenuItemIds.add(inputMenuItemId);
          } else {
            // Insert new menu item
            const [newMenuItem] = await tx
              .insert(menuItems)
              .values({
                ...menuItemUpdateData,
                categoryId,
                updatedAt: new Date(),
                createdAt: new Date(),
                updatedBy: session.user.id,
              })
              .returning({ id: menuItems.id });
            updatedMenuItemIds.add(newMenuItem.id);
          }
        }

        // Remove menu items that are no longer present
        const menuItemsToRemove = [...existingMenuItemIds].filter(
          (id) => !updatedMenuItemIds.has(id)
        );
        if (menuItemsToRemove.length > 0) {
          await tx
            .delete(menuItems)
            .where(
              and(
                eq(menuItems.categoryId, categoryId),
                inArray(menuItems.id, menuItemsToRemove)
              )
            );
        }
      }

      // Remove categories that are no longer present
      const categoriesToRemove = [...existingCategoryIds].filter(
        (id) => !updatedCategoryIds.has(id)
      );
      if (categoriesToRemove.length > 0) {
        await tx
          .delete(categories)
          .where(
            and(
              eq(categories.menuId, id),
              inArray(categories.id, categoriesToRemove)
            )
          );
      }
    });

    revalidatePath(`/menus/${id}`);
    return { success: true, message: "Menu updated successfully" };
  } catch (error) {
    console.error("Error updating menu:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

// Helper function to check if an object has changed
function hasChanged(
  existing: Record<string, any>,
  updated: Record<string, any>
): boolean {
  return Object.keys(updated).some((key) => existing[key] !== updated[key]);
}

export async function toggleMenuPublicStatus(
  data: z.infer<typeof TogglePublishMenuSchema>
) {
  await requireAuth();

  const parsed = TogglePublishMenuSchema.safeParse(data);

  if (!parsed.success) {
    console.error("Validation errors:", parsed.error);
    return { success: false, message: "Could not update menu" };
  }
  const { id, isPublic } = data;

  const session = (await getServerSession(options))!;

  const [updatedMenu] = await db
    .update(menus)
    .set({
      isPublic: !isPublic,
      updatedAt: new Date(),
      updatedBy: session.user.id,
    })
    .where(eq(menus.id, id))
    .returning({ isPublic: menus.isPublic, id: menus.id });

  revalidatePath(`/menus/${id}`);

  const result = {
    success: true,
    isPublic: updatedMenu.isPublic,
    message: `Menu ${updatedMenu.isPublic ? "published" : "unpublished"} successfully`,
  };

  return result;
}
