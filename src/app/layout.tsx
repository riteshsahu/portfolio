import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ROUTE_PATH } from "@/constants";
import Link from "next/link";

const links = [
  {
    title: "Snippets",
    path: ROUTE_PATH.SNIPPETS,
  },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex h-12 justify-between border-b-2 p-3">
          <div>
            <Link href={"/"}>Home</Link>
          </div>
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
