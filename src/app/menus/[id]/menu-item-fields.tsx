import { DollarSign, EyeOff, Plus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const menuItemTags: Option[] = [
  { value: "vegan", label: "Ⓥ", key: "Vegan" },
  { value: "vegetarian", label: "🌱", key: "Vegetarian" },
  { value: "spicy-1", label: "🌶️", key: "Mild" },
  { value: "spicy-2", label: "🌶️🌶️", key: "Medium" },
  { value: "spicy-3", label: "🌶️🌶️🌶️", key: "Hot" },
  { value: "gluten-free", label: "GF", key: "Gluten-Free" },
  { value: "seasonal", label: "Seasonal" },
];

export function MenuItemsFields({
  form,
  categoryIndex,
}: {
  form: unknown;
  categoryIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.menuItems`,
  });

  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-medium">Menu Items</h3>
        <p className="text-sm text-muted-foreground">
          These items will show within the category.
        </p>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {fields.map((field, itemIndex) => (
          <AccordionItem
            key={`item-${field.id}-${itemIndex}`}
            value={`item-${field.id}-${itemIndex}`}
            id={`item-${categoryIndex}-${itemIndex}`}
          >
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-2">
                {form.watch(
                  `categories.${categoryIndex}.menuItems.${itemIndex}.posId`
                ) && (
                  <p className="text-xl">
                    {form.watch(
                      `categories.${categoryIndex}.menuItems.${itemIndex}.posId`
                    )}
                  </p>
                )}
                <h6 className="text-xl font-medium">
                  {form.watch(
                    `categories.${categoryIndex}.menuItems.${itemIndex}.name`
                  ) || `Item ${itemIndex + 1}`}
                </h6>
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
                          <Input placeholder="Enter price" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`categories.${categoryIndex}.menuItems.${itemIndex}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={field.value.map(
                            (tag: string) =>
                              menuItemTags.find(
                                (item) => item.value === tag
                              ) || { value: tag, label: tag }
                          )}
                          onChange={(newValue) => {
                            const tagValues = newValue.map(
                              (item) => item.value
                            );
                            field.onChange(tagValues);
                          }}
                          defaultOptions={menuItemTags}
                          placeholder="Select tags..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Select tags that apply to this menu item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
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
                /> */}

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
      </Accordion>
      <Button
        size="sm"
        type="button"
        onClick={() =>
          append({
            id: undefined,
            name: "",
            description: "",
            price: "",
            hidden: false,
            image: "",
            tags: [],
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Menu Item
      </Button>
    </>
  );
}
