"use client";
import React from "react";
import Button from "../Button";
import { FiCopy } from "react-icons/fi";

interface CopySnippetButton {
  snippetId: string;
}

function CopySnippetButton({ snippetId }: CopySnippetButton) {
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
    <Button onClick={handleCopy}>
      <FiCopy />
    </Button>
  );
}

export default CopySnippetButton;
