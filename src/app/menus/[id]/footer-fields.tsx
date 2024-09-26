import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FooterFields({ menu, fields }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full gap-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          key={fields.notes.key}
          name={fields.notes.name}
          placeholder="Enter optional notes to show at the bottom of the menu"
          className="w-full"
          defaultValue={menu.notes || ""}
        />
        <p className="text-xs text-muted-foreground">
          Notes about tax, tipping, etc.
        </p>
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="message">Message</Label>
        <Textarea
          key={fields.message.key}
          name={fields.message.name}
          placeholder="Enter an optional message to show at the bottom of the menu"
          className="w-full"
          defaultValue={menu.message || ""}
        />
        <p className="text-xs text-muted-foreground">
          Commonly used to show a disclaimer, copyright, or food warning.
        </p>
      </div>
    </div>
  );
}
