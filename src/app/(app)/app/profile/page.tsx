import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/server"

export default async function Profile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("user", user)
  return (
    <Card className="mt-4 max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        {/* <CardDescription>Your profile information is managed by Google and cannot be changed here.</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <div>
          <Label>Name</Label>
          <Input disabled value={user?.name || ""} />
        </div> */}
        <div>
          <Label>Email</Label>
          <Input disabled value={user?.email || ""} />
        </div>
      </CardContent>
    </Card>
  )
}
