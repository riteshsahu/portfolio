"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";

import Loader from "@/components/Loader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { isEmpty } from "lodash";
import React, { useTransition } from "react";

interface EntityActionsProps {
  config: {
    view?: any;
    update?: any;
    delete?: any;
  };
}

function EntityActions({ config }: EntityActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const deleteAction = config?.delete?.action;

    if (deleteAction) {
      startTransition(async () => {
        await deleteAction();
        setIsOpen(false);
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {!isEmpty(config.view) && (
            <DropdownMenuItem asChild>
              <Link href={config.view.path} className="gap-2">
                <Eye size={16} />
                View
              </Link>
            </DropdownMenuItem>
          )}
          {!isEmpty(config.update) && (
            <DropdownMenuItem asChild>
              <Link href={config.update.path} className="gap-2">
                <Edit size={16} />
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {!isEmpty(config.delete) && (
            <DropdownMenuItem onSelect={() => setIsOpen(true)} asChild>
              <div className="gap-2 text-destructive hover:text-destructive">
                <Trash size={16} />
                Delete
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want delete this item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              onClick={handleDelete}
              className="gap-2"
            >
              {isPending && <Loader className="text-background" size={20} />}
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default EntityActions;
