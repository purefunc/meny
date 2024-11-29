import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <ChefHat className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Meny</span>
        </Link>
      </header>
      <div className="flex items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto mt-4 max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">404</CardTitle>
            <CardDescription>This page cannot be found.</CardDescription>
          </CardHeader>
        </div>
      </div>
    </>
  )
}
