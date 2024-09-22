"use client"

import { Nav } from "@/components/layout/nav"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading indicator
  }

  return <Nav>{children}</Nav>
}
