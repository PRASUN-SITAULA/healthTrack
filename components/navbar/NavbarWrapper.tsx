"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar/navbar"

export function NavbarWrapper() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up"

  if (isAuthPage) return null
  return <Navbar />
}
