import { Nav } from "@/components/nav"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Nav>{children}</Nav>
}
