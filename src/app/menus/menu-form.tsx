"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, EyeOff, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UpdateMenuSchema } from "@/db/schema/menus";

import { updateMenu } from "./[id]/actions";

export default function MenuForm({ menu }) {
  const form = useForm<z.infer<typeof UpdateMenuSchema>>({
    resolver: zodResolver(UpdateMenuSchema),
    defaultValues: {
      id: menu.id,
      name: menu?.name || "",
      description: menu?.description || "",
      image: menu?.image || "",
      notes: menu?.notes || "",
      isPublic: menu?.isPublic || false,
      message: menu?.message || "",
      categories:
        menu?.categories?.length > 0
          ? menu.categories.map((category) => ({
              id: category.id,
              name: category.name,
              description: category.description,
              isHidden: category.isHidden,
              image: category.image,
              notes: category.notes,
              menuItems:
                category?.menuItems?.length > 0
                  ? category.menuItems.map((item) => ({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      isHidden: item.isHidden,
                      isSeasonal: item.isSeasonal,
                      image: item.image,
                      tags: item.tags,
                    }))
                  : [
                      {
                        id: undefined,
                        name: "",
                        description: "",
                        price: "",
                        isHidden: false,
                        isSeasonal: false,
                        image: "",
                        tags: [],
                      },
                    ],
            }))
          : [
              {
                id: undefined,
                name: "",
                description: "",
                isHidden: false,
                image: "",
                notes: "",
                menuItems: [
                  {
                    id: undefined,
                    name: "",
                    description: "",
                    price: "",
                    isHidden: false,
                    isSeasonal: false,
                    image: "",
                    tags: [],
                  },
                ],
              },
            ],
    },
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const onSubmit = async (values: z.infer<typeof UpdateMenuSchema>) => {
    const result = await updateMenu(values);
    console.log("result", result);

    if (result.success) {
      toast.success(result.message || "Menu updated successfully");
    } else {
      toast.error(result.message || "Failed to update menu");
    }
  };

  console.log("Form errors:", form.formState.errors);

  return (
    <>
      <Form {...form}>
        <form
          id="menu-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 overflow-y-auto"
        >
          <CardHeader>
            <CardTitle id="general">Menu Details</CardTitle>
            <CardDescription>
              This will show at the top of the menu and in the meta data.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter establishment or menu name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your establishment or menu description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will show when sharing the menu URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator />
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle id="categories">Categories</CardTitle>
                <CardDescription>
                  These are the categories that will show on the menu.
                </CardDescription>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  appendCategory({
                    id: undefined,
                    name: "",
                    description: "",
                    menuItems: [
                      {
                        id: undefined,
                        name: "",
                        description: "",
                        price: "",
                        isHidden: false,
                        isSeasonal: false,
                        image: "",
                        tags: [],
                      },
                    ],
                  })
                }
              >
                <Plus className="mr-2 h-3 w-3" /> Add Category
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {categoryFields.map((categoryField, categoryIndex) => (
              <div key={categoryField.id} className="flex flex-col gap-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline">
                      <div className="flex items-center gap-2">
                        {form.watch(`categories.${categoryIndex}.name`) ||
                          `Category ${categoryIndex + 1}`}
                        {form.watch(`categories.${categoryIndex}.isHidden`) && (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-t">
                      <div className="relative flex flex-col gap-6 space-y-4 p-4">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => removeCategory(categoryIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>

                        <FormField
                          control={form.control}
                          name={`categories.${categoryIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter category name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`categories.${categoryIndex}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter category description"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`categories.${categoryIndex}.isHidden`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Hidden
                                </FormLabel>
                                <FormDescription>
                                  Hide this category & all it's items from the
                                  menu if it is not available.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Menu Items</h3>
                          <MenuItemsFieldArray
                            form={form}
                            categoryIndex={categoryIndex}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </CardContent>
          <Separator />

          <CardHeader>
            <CardTitle id="footer">Menu Footer</CardTitle>
            <CardDescription>
              This information will show at the bottom of the menu.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter optional notes" {...field} />
                  </FormControl>
                  <FormDescription>
                    Notes about tax, tipping, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter an optional message"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Commonly used to show a disclaimer, copyright, or food
                    warning.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </form>
        <CardFooter className="mt-auto rounded-b-lg border-t bg-card p-6">
          <Button
            type="submit"
            form="menu-form"
            className="w-full"
            onClick={() => console.log("Update Menu button clicked")}
          >
            Update Menu
          </Button>
        </CardFooter>
      </Form>
    </>
  );
}

function MenuItemsFieldArray({
  form,
  categoryIndex,
}: {
  form: any;
  categoryIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.menuItems`,
  });

  return (
    <Accordion type="multiple" className="space-y-4">
      {fields.map((field, itemIndex) => (
        <AccordionItem
          key={field.id}
          value={`item-${categoryIndex}-${itemIndex}`}
        >
          <AccordionTrigger className="text-left hover:no-underline">
            <div className="flex items-center gap-2">
              {form.watch(
                `categories.${categoryIndex}.menuItems.${itemIndex}.posId`
              ) && (
                <p className="text-sm font-semibold">
                  {form.watch(
                    `categories.${categoryIndex}.menuItems.${itemIndex}.posId`
                  )}
                </p>
              )}
              {form.watch(
                `categories.${categoryIndex}.menuItems.${itemIndex}.name`
              ) || `Item ${itemIndex + 1}`}
              {form.watch(
                `categories.${categoryIndex}.menuItems.${itemIndex}.isHidden`
              ) && <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="relative flex flex-col gap-6 space-y-4 rounded-lg border p-4">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => remove(itemIndex)}
              >
                <Trash className="h-4 w-4" />
              </Button>

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.menuItems.${itemIndex}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.menuItems.${itemIndex}.posId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a custom ID" {...field} />
                    </FormControl>
                    <FormDescription>
                      An optional custom ID commonly used to match with a POS
                      system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.menuItems.${itemIndex}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter item description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.menuItems.${itemIndex}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.menuItems.${itemIndex}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.menuItems.${itemIndex}.isHidden`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Hidden</FormLabel>
                      <FormDescription>
                        Hide this item from the menu if it is not available.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            id: undefined,
            name: "",
            description: "",
            price: "",
            hidden: false,
            image: "",
          })
        }
        className="mt-2 w-full"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
    </Accordion>
  );
}
