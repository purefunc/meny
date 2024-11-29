import { signOutAction } from "@/app/actions"
import Link from "next/link"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? (
    <form action={signOutAction}>
      <Button type="submit" className="w-full" variant={"ghost"}>
        Sign out
      </Button>
    </form>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  )
}
