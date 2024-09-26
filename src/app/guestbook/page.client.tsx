"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InsertGuestbookEntrySchema } from "@/db/schema/guestbook-entries";

import { createGuestbookEntry } from "./actions";

export default function GuestbookClient() {
  const [lastResult, action] = useFormState(createGuestbookEntry, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InsertGuestbookEntrySchema });
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
      className="mt-4 flex flex-col gap-2"
    >
      <Textarea
        key={fields.message.key}
        name={fields.message.name}
        placeholder="Enter your message"
        className="w-full"
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
