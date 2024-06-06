"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopySnippetButton extends ButtonProps {
  snippetId: string;
}

function CopySnippetButton({ snippetId, ...props }: CopySnippetButton) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const code = document.getElementById(snippetId)?.querySelector("code");

    if (code?.textContent) {
      navigator.clipboard
        .writeText(code.textContent)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        })
        .catch((err) => {
          // TODO: add some error
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleCopy} {...props}>
      {isCopied ? <Check size={20} /> : <Copy size={20} />}
    </Button>
  );
}

export default CopySnippetButton;
