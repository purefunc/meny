import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CategoryFields({ category }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full gap-1">
        <Label htmlFor="name">Name*</Label>
        <Input
          key={category.name.key}
          name={category.name.name}
          required
          placeholder="Enter category name"
          className="w-full"
          defaultValue={category.name.initialValue}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          key={category.description.key}
          name={category.description.name}
          required
          placeholder="Enter category description"
          className="w-full"
          defaultValue={category.description.initialValue}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="isHidden"
          name={category.isHidden.name}
          defaultChecked={category.isHidden.initialValue}
        />
        <Label htmlFor="isHidden">Hidden</Label>
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="image">Image URL*</Label>
        <Input
          key={category.image.key}
          name={category.image.name}
          required
          placeholder="Enter image URL"
          className="w-full"
          defaultValue={category.image.initialValue}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          key={category.notes.key}
          name={category.notes.name}
          placeholder="Enter additional notes"
          className="w-full"
          defaultValue={category.notes.initialValue}
        />
      </div>
    </div>
  );
}
