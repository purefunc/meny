"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import * as z from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TogglePublishMenuSchema } from "@/db/schema/menus";

import { toggleMenuPublicStatus } from "./actions";

export default function PublishButton({ menu }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof TogglePublishMenuSchema>>({
    resolver: zodResolver(TogglePublishMenuSchema),
    defaultValues: {
      id: menu.id,
      isPublic: menu.isPublic ?? false,
    },
  });

  const onSubmit = async (values: z.infer<typeof TogglePublishMenuSchema>) => {
    const result = await toggleMenuPublicStatus(values);
    console.log("result", result);

    router.refresh();

    // if (result?.success) {
    //   toast.success(result?.message || "Menu updated successfully");
    // } else {
    //   toast.error(result?.message || "Failed to update menu");
    // }
  };

  console.log("PUB ERR", form.formState.errors);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{menu.isPublic ? "Unpublish Menu" : "Publish Menu"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {menu.isPublic ? "Make Private?" : "Publish Menu?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {menu.isPublic
              ? "This will make your menu private and inaccessible to the public."
              : "This will make your menu public and accessible to everyone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AlertDialogAction type="submit">Continue</AlertDialogAction>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
