"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTE_PATH } from "@/constants";
import { logout } from "@/lib/auth/actions";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MyAccountMenu() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith(ROUTE_PATH.DASHBOARD);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isDashboard ? (
          <DropdownMenuItem>
            <Link href={ROUTE_PATH.HOME}>Home</Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href={ROUTE_PATH.DASHBOARD}>Dashboard</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <form action={logout}>
          <DropdownMenuItem>
            <Button variant={"ghost"} type="submit">
              Logout
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MyAccountMenu;
