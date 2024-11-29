import Link from "next/link"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
// import AuthButton from "./google-auth-button"
import Breadcrumbs from "./breadcrumbs"
import MobileNav from "./mobile-nav"
import { createClient } from "@/utils/supabase/server"
import HeaderAuth from "@/components/header-auth"
import { ThemeSwitcher } from "../theme-switcher"

export default async function TopNav() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex items-center gap-4">
        <MobileNav />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/app/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <AuthButton /> */}
            <HeaderAuth />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
