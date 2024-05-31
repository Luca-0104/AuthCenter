"use client";

import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-secondary w-[600px] rounded-xl p-4 my-6 shadow-sm flex items-center justify-between">
      <div className="space-x-2">
        <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
          <Link href="/server">
            Server
          </Link>
        </Button>
        <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
          <Link href="/client">
            Client
          </Link>
        </Button>
        <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
          <Link href="/settings">
            Settings
          </Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">
            Admin
          </Link>
        </Button>
      </div>
      <UserButton />
    </div>
  )
}
