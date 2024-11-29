import SideNav from "@/components/layout/side-nav"
import { Toaster } from "@/components/ui/sonner"
import TopNav from "@/components/layout/top-nav"
import requireAuth from "@/utils/require-auth"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAuth()

  return (
    <>
      <main className="mx-auto grid w-full max-w-[1440px] flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <SideNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <TopNav />
          {children}
        </div>
      </main>
      <Toaster />
    </>
  )
}
