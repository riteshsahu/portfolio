import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ROUTE_PATH } from "@/constants";
import Link from "next/link";
import { logout } from "@/lib/auth/actions";
import { getAuth } from "@/lib/auth";
import Button from "@/components/Button";
import clsx from "clsx";
import { FiLogOut } from "react-icons/fi";

const links = [
  {
    title: "Snippets",
    path: ROUTE_PATH.SNIPPETS,
  },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ritesh",
  description: "Ritesh's Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuth();

  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <header className="flex h-12 justify-between border-b-2 border-black p-3">
          <div>
            <Link href={"/"}>Home</Link>
          </div>
          {auth?.user && (
            <form action={logout}>
              <Button type="submit">
                <FiLogOut />
              </Button>
            </form>
          )}
          <nav>
            <ul>
              {links.map((link) => (
                <li key={link.title}>
                  <Link href={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
