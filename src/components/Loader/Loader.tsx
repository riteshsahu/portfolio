import { cn } from "@/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoaderProps {
  className?: string;
  size?: number;
}

function Loader({ className, size = 26 }: LoaderProps) {
  return (
    <LoaderCircle
      size={size}
      className={cn("animate-spin text-primary/60", className)}
    />
  );
}

export default Loader;
