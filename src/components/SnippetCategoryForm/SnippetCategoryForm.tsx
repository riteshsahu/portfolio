"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { upsertSnippetCategory } from "@/lib/actions";
import { AddSnippetCategoryFormInputs } from "@/lib/types";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SnippetCategoryFormProps {
  defaultValues?: AddSnippetCategoryFormInputs;
  slug?: string;
}

function SnippetCategoryForm({
  defaultValues,
  slug,
}: SnippetCategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<AddSnippetCategoryFormInputs>({
    defaultValues: {
      name: "",
      ...defaultValues,
    },
  });

  const onSubmit: SubmitHandler<AddSnippetCategoryFormInputs> = (values) => {
    startTransition(async () => {
      const json = await upsertSnippetCategory(values, {
        shouldRedirect: true,
        slug,
      });
      if (json && !json.ok && json.message) {
        setError(json.message);
      } else {
        setError("");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[400px] space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input required placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!error && <FormMessage>{error}</FormMessage>}
        <Button className="min-w-[117px]" disabled={isPending} type="submit">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default SnippetCategoryForm;
