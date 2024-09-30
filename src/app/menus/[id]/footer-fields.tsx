"use client";

import { Asterisk, Plus, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";

export function FooterFields({ form }) {
  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control: form.control,
    name: "notes",
  });
  return (
    <>
      <CardHeader>
        <CardTitle id="footer">Menu Footer</CardTitle>
        <CardDescription>
          This information will show at the bottom of the menu.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div>
          <FormField
            control={form.control}
            name="notes"
            render={() => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <div className="space-y-2">
                  {noteFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Asterisk className="h-4 w-4" />
                      <FormControl>
                        <Input
                          {...form.register(`notes.${index}`)}
                          placeholder={`Note ${index + 1}`}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNote(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <FormDescription>
                  Notes about tax, tipping, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {noteFields.length <= 3 && (
            <Button
              type="button"
              size="sm"
              className="mt-4 w-fit"
              variant="secondary"
              onClick={() => appendNote("")}
            >
              <Plus className="mr-2 h-3 w-3" />
              Add Note
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter an optional message" {...field} />
              </FormControl>
              <FormDescription>
                Commonly used to show a disclaimer, copyright, or food warning.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
}
