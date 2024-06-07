"use client";

import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function NavLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  const activePathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        className,
        activePathname === props.href && "text-foreground",
      )}
    />
  );
}

export default NavLink;
