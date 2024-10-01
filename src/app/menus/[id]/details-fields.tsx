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

export function DetailsFields({ form }) {
  return (
    <>
      <CardHeader>
        <CardTitle id="details">Menu Details</CardTitle>
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
    </>
  );
}
