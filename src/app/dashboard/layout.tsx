import CommonBreadcrumbs from "@/components/CommonBreadcrumbs";
import MyAccountMenu from "@/components/MyAccountMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { ROUTE_PATH } from "@/constants";
import { Code, Menu, Package2, Shapes, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

const dashboardLinks = [
  {
    name: "Snippets",
    Icon: Code,
    path: ROUTE_PATH.SNIPPETS,
  },
  {
    name: "Snippet Categories",
    Icon: Tag,
    path: ROUTE_PATH.SNIPPETS_CATEGORIES,
  },
  {
    name: "Resources",
    Icon: Shapes,
    path: ROUTE_PATH.RESOURCES,
  },
  {
    name: "Resource Categories",
    Icon: Tag,
    path: ROUTE_PATH.RESOURCES_CATEGORIES,
  },
];

const SidebarLinks = () => (
  <>
    {dashboardLinks.map((link) => (
      <Link
        key={link.path}
        href={link.path}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <link.Icon className="h-4 w-4" />
        {link.name}
      </Link>
    ))}
  </>
);

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Home</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <SidebarLinks />
            </nav>
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <SidebarLinks />
              </nav>
              <div className="mt-auto"></div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <ThemeToggle />
          <MyAccountMenu />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <CommonBreadcrumbs />
          <div className="flex flex-1 flex-col">{children}</div>
        </main>
        <Toaster richColors={true} />
      </div>
    </div>
  );
}
