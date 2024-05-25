import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import clsx from "clsx";
// import { PUBLIC_ROUTES, ROUTE_PATH } from "@/constants";
// import Link from "next/link";
// import { getAuth } from "@/lib/auth";

// const links = [
//   {
//     title: "Snippets",
//     path: ROUTE_PATH.SNIPPETS,
//   },
//   {
//     title: "Dashboard",
//     path: ROUTE_PATH.DASHBOARD,
//   },
// ];

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
  // const auth = await getAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className)}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {/* <header className="flex h-12 justify-between border-b-2 border-black p-3">
          <div>
            <Link href={"/"}>Home</Link>
          </div>
          <nav>
            <ul className="flex gap-5">
              {links.map((link) => {
                if (!auth.user && !PUBLIC_ROUTES.includes(link.path as any)) {
                  return;
                }

                return (
                  <li key={link.title}>
                    <Link href={link.path}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
