import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function requireAuth() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  return user
}
