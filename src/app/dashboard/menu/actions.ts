"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/db/drizzle";
import { categoryTable, menuItemTable, menuTable } from "@/db/menu";

// Get all menus
export const getMenus = async () => {
  const data = await db.select().from(menuTable);
  return data;
};

// Get a single menu with its related categories and menu items
export const getMenuWithDetails = async (menu_id: number) => {
  // Fetch the menu
  const menu = await db
    .select()
    .from(menuTable)
    .where(eq(menuTable.id, menu_id))
    .then((rows) => rows[0]);

  if (!menu) {
    throw new Error(`Menu with id ${menu_id} not found`);
  }

  // Fetch the categories for the menu
  const categories = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.menu_id, menu_id));

  // Fetch the menu items for each category
  for (const category of categories) {
    const menuItems = await db
      .select()
      .from(menuItemTable)
      .where(eq(menuItemTable.category_id, category.id));
    category.menuItems = menuItems;
  }

  // Nest categories inside the menu
  menu.categories = categories;

  return menu;
};

// Add a new menu
export const addMenu = async (
  title: string,
  description: string,
  logo_src?: string,
  image_src?: string
) => {
  const uniqueId = uuidv4();

  await db.insert(menuTable).values({
    id: uniqueId,
    title: title,
    description: description,
    logo_src: logo_src,
    image_src: image_src,
  });

  revalidatePath("/");
};

// Delete a menu
export const deleteMenu = async (id: number) => {
  await db.delete(menuTable).where(eq(menuTable.id, id));

  revalidatePath("/");
};

// Edit a menu
export const editMenu = async (
  id: number,
  title: string,
  description: string,
  logo_src?: string,
  image_src?: string
) => {
  await db
    .update(menuTable)
    .set({
      title: title,
      description: description,
      logo_src: logo_src,
      image_src: image_src,
    })
    .where(eq(menuTable.id, id));

  revalidatePath("/");
};

// Get all categories for a menu
export const getCategories = async (menu_id: number) => {
  const data = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.menu_id, menu_id));
  return data;
};

// Add a new category
export const addCategory = async (
  id: number,
  title: string,
  description: string,
  menu_id: number,
  image_src?: string
) => {
  await db.insert(categoryTable).values({
    id: id,
    title: title,
    description: description,
    menu_id: menu_id,
    image_src: image_src,
  });

  revalidatePath("/");
};

// Delete a category
export const deleteCategory = async (id: number) => {
  await db.delete(categoryTable).where(eq(categoryTable.id, id));

  revalidatePath("/");
};

// Edit a category
export const editCategory = async (
  id: number,
  title: string,
  description: string,
  image_src?: string
) => {
  await db
    .update(categoryTable)
    .set({
      title: title,
      description: description,
      image_src: image_src,
    })
    .where(eq(categoryTable.id, id));

  revalidatePath("/");
};

// Get all menu items for a category
export const getMenuItems = async (category_id: number) => {
  const data = await db
    .select()
    .from(menuItemTable)
    .where(eq(menuItemTable.category_id, category_id));
  return data;
};

// Add a new menu item
export const addMenuItem = async (
  id: number,
  title: string,
  description: string,
  price: number,
  hidden: boolean,
  category_id: number,
  image_src?: string,
  tags?: string[]
) => {
  await db.insert(menuItemTable).values({
    id: id,
    title: title,
    description: description,
    price: price,
    hidden: hidden,
    category_id: category_id,
    image_src: image_src,
    tags: tags,
  });

  revalidatePath("/");
};

// Delete a menu item
export const deleteMenuItem = async (id: number) => {
  await db.delete(menuItemTable).where(eq(menuItemTable.id, id));

  revalidatePath("/");
};

// Edit a menu item
export const editMenuItem = async (
  id: number,
  title: string,
  description: string,
  price: number,
  hidden: boolean,
  image_src?: string,
  tags?: string[]
) => {
  await db
    .update(menuItemTable)
    .set({
      title: title,
      description: description,
      price: price,
      hidden: hidden,
      image_src: image_src,
      tags: tags,
    })
    .where(eq(menuItemTable.id, id));

  revalidatePath("/");
};
