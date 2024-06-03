"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upsertResource, upsertResourceCategory } from "@/lib/actions";
import { AddResourceFormInputs } from "@/lib/types";
import { cn } from "@/utils";
import { SyntheticEvent, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ResourceCategory } from "@prisma/client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loader from "@/components/Loader";
import { ROUTE_PATH } from "@/constants";

interface ResourceFormProps {
  categories: ResourceCategory[];
  defaultValues?: AddResourceFormInputs;
  slug?: string;
}

function ResourceForm({
  categories = [],
  defaultValues,
  slug,
}: ResourceFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isAddCategoryPending, startAddCategoryTransition] = useTransition();
  const [error, setError] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const form = useForm<AddResourceFormInputs>({
    defaultValues: {
      name: "",
      image: "",
      link: "",
      description: "",
      categoryId: "",
      ...defaultValues,
    },
  });

  const onSubmit: SubmitHandler<AddResourceFormInputs> = (values) => {
    startTransition(async () => {
      const json = await upsertResource(values, {
        slug,
      });
      if (json && !json.ok && json.message) {
        setError(json.message);
      } else {
        setError("");
      }
    });
  };

  const handleAddCategory = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startAddCategoryTransition(async () => {
      await upsertResourceCategory(
        {
          name: categorySearch,
        },
        { pathToRevalidate: ROUTE_PATH.ADD_RESOURCE },
      );
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
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool Link</FormLabel>
              <FormControl>
                <Input required placeholder="Enter tool link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter image link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
                    <CommandInput
                      placeholder="Search category..."
                      value={categorySearch}
                      onValueChange={setCategorySearch}
                    />
                    <CommandEmpty className="px-3 py-3">
                      <div>No category found.</div>
                      <Button
                        onClick={handleAddCategory}
                        type="button"
                        disabled={isAddCategoryPending}
                        className="mt-3"
                        variant={"outline"}
                        size={"sm"}
                      >
                        <span className="mr-2">
                          {isAddCategoryPending ? (
                            <Loader size={20} />
                          ) : (
                            <Plus size={20} />
                          )}
                        </span>
                        Add
                      </Button>
                    </CommandEmpty>
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

        {!!error && <FormMessage>{error}</FormMessage>}
        <Button className="min-w-[117px]" disabled={isPending} type="submit">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default ResourceForm;
