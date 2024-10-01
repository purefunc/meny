"use client";

import { useRouter } from "next/navigation";

// import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { MenuSchema } from "@/db/schema/menus";

import { updateMenu } from "./actions";
import { CategoryFields } from "./category-fields";
import { DetailsFields } from "./details-fields";
import { FooterFields } from "./footer-fields";

export default function MenuForm({
  form,
  openCategoryAccordions,
  toggleCategoryAccordion,
}) {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof MenuSchema>) => {
    console.log("Submitting values:", JSON.stringify(values, null, 2));

    const result = await updateMenu(values);
    console.log("result", result);

    router.refresh();

    // if (result?.success) {
    //   toast.success(result?.message || "Menu updated successfully");
    // } else {
    //   toast.error(result?.message || "Failed to update menu");
    // }
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
          <DetailsFields form={form} />
          <Separator />
          <CategoryFields
            form={form}
            toggleCategoryAccordion={toggleCategoryAccordion}
            openCategoryAccordions={openCategoryAccordions}
          />
          <Separator />
          <FooterFields form={form} />
        </form>

        <CardFooter className="mt-auto rounded-b-lg bg-card py-4">
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
