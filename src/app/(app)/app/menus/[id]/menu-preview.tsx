import { Card } from "@/components/ui/card"
import Menu from "../../menu/[id]/menu"

export default function MenuPreview({ menu }) {
  return (
    <Card className="flex h-[100dvh] w-[100dvw] flex-col overflow-y-auto sm:h-[667px] sm:w-[375px] sm:rounded-3xl sm:shadow-lg">
      <Menu menu={menu} />
    </Card>
  )
}
