"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<typeof Button>;

function SubmitButton({ children, ...delegated }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...delegated} type="submit" disabled={pending}>
      {children}
    </Button>
  );
}

export default SubmitButton;
