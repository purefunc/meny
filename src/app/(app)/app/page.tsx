export const runtime = "edge"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AppPage() {
  return (
    <>
      <div className="align-start flex justify-center">
        <div>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Coming Soon</CardTitle>
            <CardDescription>We&apos;re working on something awesome!</CardDescription>
          </CardHeader>
        </div>
      </div>
    </>
  )
}
