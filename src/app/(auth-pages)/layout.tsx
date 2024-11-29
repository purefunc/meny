import { Card } from "@/components/ui/card"
import { ChefHat } from "lucide-react"
import Link from "next/link"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <ChefHat className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Meny</span>
        </Link>
      </header>
      <div className="flex items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-5">{children}</Card>
      </div>
    </>
  )
}
