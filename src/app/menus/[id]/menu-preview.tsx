import Menu from "@/app/menu/[id]/menu";
import { Card } from "@/components/ui/card";

export default function MenuPreview({ menu }) {
  return (
    <div className="flex h-full">
      <Card className="flex h-[667px] w-[375px] flex-col overflow-y-auto rounded-3xl shadow-lg">
        <Menu menu={menu} />
      </Card>
    </div>
  );
}
