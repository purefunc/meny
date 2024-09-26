"use client";

import { Fragment } from "react";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Plus } from "lucide-react";
import { useFormState } from "react-dom";

// import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateMenuSchema } from "@/db/schema/menus";

import { updateMenu } from "./actions";
import CategoryFields from "./category-fields";
import FooterFields from "./footer-fields";
import MenuFields from "./menu-fields";
import MenuMobileNav from "./menu-mobile-nav";
import MenuNav from "./menu-nav";

export default function MenuClient({ menu }) {
  const [lastResult, action] = useFormState(updateMenu, undefined);
  console.log("lastResult", lastResult);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateMenuSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      name: menu.name,
      description: menu.description || "",
      notes: menu.notes || "",
      message: menu.message || "",
      categories: menu.categories || [
        {
          name: "",
          description: "",
          image: "",
          items: [],
        },
      ],
    },
  });
  const categories = fields.categories.getFieldList();

  // console.log("categories", categories);

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: "",
  //     description: "",
  //     categories: [],
  //   },
  // });

  // const {
  //   fields: categoryFields,
  //   append: appendCategory,
  //   remove: removeCategory,
  // } = useFieldArray({
  //   control: form.control,
  //   name: "categories",
  // });

  return (
    <div className="flex h-[calc(100vh_-_theme(spacing.16))] flex-col bg-muted/40">
      <div className="grid w-full max-w-5xl flex-grow grid-cols-1 gap-4 overflow-hidden p-4 md:grid-cols-[180px_1fr] md:p-10 lg:grid-cols-[250px_1fr]">
        <div className="flex flex-col">
          <h1 className="mb-4 text-3xl font-semibold">Edit Menu</h1>

          <MenuMobileNav categories={menu.categories} />
          <div className="hidden md:block">
            <MenuNav categories={menu.categories} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <Card className="flex h-full flex-col">
            <form
              id={form.id}
              onSubmit={form.onSubmit}
              action={action}
              noValidate
              className="flex flex-col gap-6 overflow-y-auto"
            >
              <CardHeader>
                <CardTitle id="general">Details</CardTitle>
                <CardDescription>
                  This will show at the top of the menu and in the meta data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MenuFields menu={menu} fields={fields} />
              </CardContent>
              <Separator />
              <CardHeader>
                <CardTitle id="categories">Categories</CardTitle>
              </CardHeader>
              {categories.map((category) => (
                <Fragment key={category.id}>
                  <CardContent>
                    <CategoryFields category={category} fields={fields} />
                  </CardContent>
                  <Separator />
                </Fragment>
              ))}
              <Button className="mt-2">
                Add Category
                <Plus className="ml-2 h-4 w-4" />
              </Button>

              <CardHeader>
                <CardTitle id="general">Footer</CardTitle>
                <CardDescription>
                  This information will show at the bottom of the menu.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FooterFields menu={menu} fields={fields} />
              </CardContent>
            </form>
            <div className="mt-auto border-t bg-card p-6">
              <Button type="submit" form={form.id} className="w-full">
                Update Menu
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
