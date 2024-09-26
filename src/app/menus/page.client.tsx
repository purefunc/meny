"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateMenuSchema } from "@/db/schema/menus";

import { createMenu } from "./actions";

export default function MenuClient() {
  const [lastResult, action] = useFormState(createMenu, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateMenuSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className="mt-4 flex flex-col gap-6"
    >
      <div className="grid w-full gap-1">
        <Label htmlFor="description">Name*</Label>
        <Input
          key={fields.name.key}
          name={fields.name.name}
          required
          placeholder="Enter establishment or menu name"
          className="w-full"
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          key={fields.description.key}
          name={fields.description.name}
          placeholder="Enter your description"
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">
          This will show when sharing the URL to the menu.
        </p>
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
}
