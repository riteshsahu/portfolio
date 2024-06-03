"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface CopySnippetButton extends ButtonProps {
  snippetId: string;
}

function CopySnippetButton({ snippetId, ...props }: CopySnippetButton) {
  const handleCopy = () => {
    const code = document.getElementById(snippetId)?.querySelector("code");
    if (code?.textContent) {
      navigator.clipboard
        .writeText(code.textContent)
        .then(() => {
          // TODO: add some button animation
        })
        .catch((err) => {
          // TODO: add some error
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleCopy} {...props}>
      <Copy />
    </Button>
  );
}

export default CopySnippetButton;
