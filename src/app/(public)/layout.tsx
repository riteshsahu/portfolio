import { Menu } from "lucide-react";
import Link from "next/link";

import MyAccountMenu from "@/components/MyAccountMenu";
import NavLink from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ROUTE_PATH } from "@/constants";
import { ReactNode } from "react";
import { getAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

const navLinks = [
  {
    name: "Snippets",
    path: ROUTE_PATH.PUBLIC_SNIPPETS,
  },
  {
    name: "Resources",
    path: ROUTE_PATH.PUBLIC_RESOURCES,
  },
];

export default async function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const auth = await getAuth();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className=" top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link
          href={ROUTE_PATH.HOME}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo />
        </Link>
        <nav className="hidden flex-1 flex-col justify-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.path}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
          <ThemeToggle />

          {auth?.user && <MyAccountMenu />}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="" side="left">
              <nav className="grid h-full place-content-center place-items-center gap-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    href={link.path}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
