import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CategoryFields({ category, fields }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full gap-1">
        <Label htmlFor="name">Name*</Label>
        <Input
          key={fields.name.key}
          name={fields.name.name}
          required
          placeholder="Enter category name"
          className="w-full"
          defaultValue={category.name}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          key={fields.description.key}
          name={fields.description.name}
          required
          placeholder="Enter category description"
          className="w-full"
          defaultValue={category.description}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="isHidden"
          name={fields.isHidden.name}
          defaultChecked={category.isHidden}
        />
        <Label htmlFor="isHidden">Hidden</Label>
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="image">Image URL*</Label>
        <Input
          key={fields.image.key}
          name={fields.image.name}
          required
          placeholder="Enter image URL"
          className="w-full"
          defaultValue={category.image}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          key={fields.notes.key}
          name={fields.notes.name}
          placeholder="Enter additional notes"
          className="w-full"
          defaultValue={category.notes || ""}
        />
      </div>
    </div>
  );
}
