"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getSiteMetaData,
  upsertResource,
  upsertResourceCategory,
} from "@/lib/actions";
import { AddResourceFormInputs } from "@/lib/types";
import { addProtocolToUrl, cn } from "@/utils";
import {
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ResourceCategory } from "@prisma/client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";

import Loader from "@/components/Loader";
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
import { ROUTE_PATH } from "@/constants";
import { debounce, isNil, omitBy } from "lodash";
import { toast } from "sonner";

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
  const [isFethingMetaData, startFetchMetaDataTransition] = useTransition();
  const [error, setError] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [isExactMatch, setIsExactMatch] = useState(false);
  const form = useForm<AddResourceFormInputs>({
    defaultValues: {
      name: "",
      icon: "",
      image: "",
      url: "",
      title: "",
      description: "",
      categoryId: "",
      ...omitBy(defaultValues, isNil),
    },
  });

  const watchUrl = form.watch("url", "");

  const handleAutoPopulateFields = useMemo(
    () =>
      debounce((pageUrl: string) => {
        startFetchMetaDataTransition(async () => {
          const siteMetaData = await getSiteMetaData(pageUrl);
          if (siteMetaData) {
            const formValues = form.getValues();

            const populateValue = (
              formFieldName: keyof AddResourceFormInputs,
              metaDataValue: any,
            ) => {
              if (metaDataValue && !formValues[formFieldName]) {
                form.setValue(formFieldName, metaDataValue);
              }
            };

            populateValue("name", siteMetaData.site_name || siteMetaData.title);
            populateValue("icon", siteMetaData.faviconlink);
            populateValue("description", siteMetaData.description);
            populateValue("image", siteMetaData.image);
            if (siteMetaData.title !== siteMetaData.site_name) {
              populateValue("title", siteMetaData.title);
            }
          }
        });
      }, 500),
    [form],
  );

  useEffect(() => {
    try {
      if (watchUrl) {
        const url = new URL(addProtocolToUrl(watchUrl));
        handleAutoPopulateFields(url.href);
      }
    } catch (error) {
      console.log(error);
    }
  }, [watchUrl, handleAutoPopulateFields]);

  const onSubmit: SubmitHandler<AddResourceFormInputs> = (values) => {
    startTransition(async () => {
      try {
        const json = await upsertResource(values, {
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
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Resource Link
                {isFethingMetaData && <Loader size={12} />}
              </FormLabel>
              <FormControl>
                <Input required placeholder="Enter resource link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter icon link" {...field} />
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
                <Textarea placeholder="Enter description" {...field} />
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
                  <Command loop>
                    <CommandInput
                      required
                      placeholder="Search category..."
                      value={categorySearch}
                      onValueChange={setCategorySearch}
                      isExactMatch={isExactMatch}
                      onToggleExactMatch={() =>
                        setIsExactMatch((isMatch) => !isMatch)
                      }
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
                        {categories
                          .filter(({ name }) => {
                            if (isExactMatch && categorySearch) {
                              return (
                                name?.toLowerCase() ===
                                categorySearch?.toLowerCase()
                              );
                            }
                            return true;
                          })
                          .map((category) => (
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
