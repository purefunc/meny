import { Asterisk, EyeOff, Plus, Trash, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { MenuItemsFields } from "./menu-item-fields";

export function CategoryFields({
  form,
  toggleCategoryAccordion,
  openCategoryAccordions,
}) {
  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });
  return (
    <>
      <CardHeader>
        <CardTitle id="categories">Categories</CardTitle>
        <CardDescription>
          These are the categories that will show on the menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={openCategoryAccordions}
          onValueChange={toggleCategoryAccordion}
          className="w-full"
        >
          {categoryFields.map((categoryField, categoryIndex) => (
            <div
              key={`category-${categoryField.id}-${categoryIndex}`}
              className="flex flex-col gap-6"
              id={`category-${categoryIndex}`}
            >
              <AccordionItem value={`category-${categoryIndex}`}>
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <h5 className="text-2xl font-medium">
                      {form.watch(`categories.${categoryIndex}.name`) ||
                        `Category ${categoryIndex + 1}`}
                    </h5>
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
                            <FormLabel className="text-base">Hidden</FormLabel>
                            <FormDescription>
                              Hide this category & all it's items from the menu
                              if it is not available.
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

                    {/* <FormField
                      control={form.control}
                      name={`categories.${categoryIndex}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}

                    <div>
                      <FormField
                        control={form.control}
                        name={`categories.${categoryIndex}.notes`}
                        render={() => (
                          <FormItem>
                            <FormLabel>Category Notes</FormLabel>
                            <div className="space-y-2">
                              {form
                                .watch(`categories.${categoryIndex}.notes`, [])
                                .map((note, noteIndex) => (
                                  <div
                                    key={noteIndex}
                                    className="flex items-center space-x-2"
                                  >
                                    <Asterisk className="h-4 w-4" />
                                    <FormControl>
                                      <Input
                                        {...form.register(
                                          `categories.${categoryIndex}.notes.${noteIndex}`
                                        )}
                                        placeholder={`Note ${noteIndex + 1}`}
                                      />
                                    </FormControl>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const currentNotes = form.getValues(
                                          `categories.${categoryIndex}.notes`
                                        );
                                        form.setValue(
                                          `categories.${categoryIndex}.notes`,
                                          currentNotes.filter(
                                            (_, index) => index !== noteIndex
                                          )
                                        );
                                      }}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                            </div>
                            <FormDescription>
                              Additional information or notes about this
                              category.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch(`categories.${categoryIndex}.notes`, [])
                        .length <= 3 && (
                        <Button
                          type="button"
                          size="sm"
                          className="mt-4 w-fit"
                          variant="secondary"
                          onClick={() => {
                            const currentNotes =
                              form.getValues(
                                `categories.${categoryIndex}.notes`
                              ) || [];
                            form.setValue(`categories.${categoryIndex}.notes`, [
                              ...currentNotes,
                              "",
                            ]);
                          }}
                        >
                          <Plus className="mr-2 h-3 w-3" />
                          Add Category Note
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <MenuItemsFields
                        form={form}
                        categoryIndex={categoryIndex}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
        <Button
          type="button"
          className="mt-4"
          size="sm"
          onClick={() =>
            appendCategory({
              id: undefined,
              name: "",
              description: "",
              notes: [""],
              isHidden: false,
              image: "",
              menuItems: [
                {
                  id: undefined,
                  posId: "",
                  name: "",
                  description: "",
                  price: "",
                  isHidden: false,
                  image: "",
                  tags: [],
                },
              ],
            })
          }
        >
          <Plus className="mr-2 h-3 w-3" /> Add Category
        </Button>
      </CardContent>
    </>
  );
}
