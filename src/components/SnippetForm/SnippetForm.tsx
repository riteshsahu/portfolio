"use client";

import SnippetEditor from "@/components/SnippetEditor/SnippetEditor";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { SNIPPET_DEFAULT_LANGUAGE } from "@/constants";
import { upsertSnippet } from "@/lib/actions";
import { AddSnippetFormInputs } from "@/lib/types";
import { cn } from "@/utils";
import { SnippetCategory } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bundledLanguagesInfo } from "shiki/bundle/web";
import { toast } from "sonner";

interface SnippetFormProps {
  categories: SnippetCategory[];
  defaultValues?: AddSnippetFormInputs;
  slug?: string;
}

function SnippetForm({ categories, defaultValues, slug }: SnippetFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<AddSnippetFormInputs>({
    defaultValues: {
      title: "",
      lang: SNIPPET_DEFAULT_LANGUAGE,
      code: "",
      description: "",
      categoryId: "",
      ...defaultValues,
    },
  });

  const selectedLanguage = form.watch("lang", SNIPPET_DEFAULT_LANGUAGE);

  const onSubmit: SubmitHandler<AddSnippetFormInputs> = (values) => {
    startTransition(async () => {
      try {
        const json = await upsertSnippet(values, {
          slug,
        });
        if (json && json.message && !json.ok) {
          setError(json.message);
        } else {
          setError("");
        }
      } catch (error) {
        toast.error("Server Error, Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {!!error && <FormMessage className="mb-3">{error}</FormMessage>}
        <div className="grid grid-cols-5 gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input required placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.id === field.value,
                            )?.name
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("categoryId", category.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="sm:min-h-[80px]"
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="relative flex flex-1 flex-col">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Code Snippet</FormLabel>
                <FormControl>
                  <SnippetEditor
                    lang={selectedLanguage}
                    value={field.value}
                    onChange={field.onChange}
                    className="flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem className="absolute right-0 top-8">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="border-none bg-transparent">
                      <Button
                        variant="ghost"
                        role="combobox"
                        className={cn(
                          "w-full justify-between !text-background hover:!bg-transparent hover:brightness-75 hover:filter dark:!text-foreground",
                        )}
                      >
                        {field.value
                          ? bundledLanguagesInfo.find(
                              (lang) => lang.id === field.value,
                            )?.name
                          : "Select language"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {bundledLanguagesInfo.map((lang) => (
                            <CommandItem
                              key={lang.id}
                              value={lang.name}
                              onSelect={() => {
                                form.setValue("lang", lang.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  lang.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {lang.name}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="min-w-[117px] self-end"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default SnippetForm;
