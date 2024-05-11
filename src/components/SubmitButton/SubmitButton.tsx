"use client";

import { useFormStatus } from "react-dom";
import Button from "../Button";
import React from "react";

type SubmitButtonProps = React.ComponentProps<typeof Button>;

function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  );
}

export default SubmitButton;
