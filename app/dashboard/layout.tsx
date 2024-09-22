import { Nav } from "@/components/layout/nav"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Nav>{children}</Nav>
}
