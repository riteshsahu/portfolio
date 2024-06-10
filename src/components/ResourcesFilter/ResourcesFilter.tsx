"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { ResourceCategory } from "@prisma/client";
import { isEmpty } from "lodash";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface ResourcesFilterProps {
  categoriesPromise: Promise<ResourceCategory[]>;
}

function ResourcesFilter({ categoriesPromise }: ResourcesFilterProps) {
  const categories = use(categoriesPromise) || [];
  const searchParams = useSearchParams();
  const [categorySearch, setCategorySearch] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();
  const categorySlug = searchParams.get("category")?.toString();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}` as any);
  }, 300);

  const handleSelectCategory = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}` as any);
  };

  return (
    <div className="flex flex-wrap gap-5">
      <Input
        className="sm:flex-1"
        type="search"
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "min-w-56 flex-1 justify-between sm:flex-initial",
              !categorySlug && "text-muted-foreground",
            )}
          >
            {categorySlug
              ? categories.find((category) => category.slug === categorySlug)
                  ?.name
              : "Select category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command loop>
            <CommandInput
              placeholder="Search category..."
              value={categorySearch}
              onValueChange={setCategorySearch}
            />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                <CommandItem
                  className={"opacity-70"}
                  value={""}
                  onSelect={handleSelectCategory}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isEmpty(categorySlug) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  Select Category
                </CommandItem>
                {categories.map((category) => (
                  <CommandItem
                    value={category.slug}
                    key={category.id}
                    onSelect={handleSelectCategory}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        category.slug === categorySlug
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
    </div>
  );
}

export default ResourcesFilter;
