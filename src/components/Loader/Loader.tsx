import { cn } from "@/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoaderProps {
  className: string;
}

function Loader({ className }: LoaderProps) {
  return (
    <LoaderCircle
      size={26}
      className={cn("my-28 animate-spin text-primary/60", className)}
    />
  );
}

export default Loader;
