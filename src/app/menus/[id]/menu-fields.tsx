import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MenuFields({ menu, fields }) {
  return (
    <div className="flex flex-col gap-6">
      <input type="hidden" name="id" value={menu.id} />
      <div className="grid w-full gap-1">
        <Label htmlFor="name">Name*</Label>
        <Input
          key={fields.name.key}
          name={fields.name.name}
          required
          placeholder="Enter establishment or menu name"
          className="w-full"
          defaultValue={menu.name}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          key={fields.description.key}
          name={fields.description.name}
          placeholder="Enter your establishment or menu description"
          className="w-full"
          defaultValue={menu.description || ""}
        />
        <p className="text-sm text-muted-foreground">
          This will show when sharing the URL to the menu.
        </p>
      </div>
    </div>
  );
}
