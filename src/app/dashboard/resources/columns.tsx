"use client";

import EntityActions from "@/components/EntityActions";
import {
  DataTableColumnHeader,
  getSelectColumn,
} from "@/components/ui/data-table";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteResource } from "@/lib/actions";
import { Resource } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Resource>[] = [
  getSelectColumn<Resource>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div
        className="flex items-center gap-3"
        title={row.original.title ?? undefined}
      >
        <Avatar className="h-6 w-6">
          {row.original.icon && <AvatarImage src={row.original.icon} />}
          <AvatarFallback className="text-sm">CC</AvatarFallback>
        </Avatar>
        <Button variant={"link"} asChild>
          <Link target="_blank" href={row.original.url as any} passHref={true}>
            {row.original.name}
          </Link>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div
          className="line-clamp-2 max-w-[400px]"
          title={row.original.description ?? undefined}
        >
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "category.name",
    id: "Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, slug } = row.original;

      return (
        <EntityActions
          config={{
            view: {
              path: getRoutePath(ROUTE_PATH.VIEW_RESOURCE, {
                slug,
              }),
            },
            update: {
              path: getRoutePath(ROUTE_PATH.UPDATE_RESOURCE, {
                slug,
              }),
            },
            delete: {
              action: deleteResource.bind(null, id),
            },
          }}
        />
      );
    },
  },
];
