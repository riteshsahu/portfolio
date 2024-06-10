"use client";

import EntityActions from "@/components/EntityActions";
import {
  DataTableColumnHeader,
  getSelectColumn,
} from "@/components/ui/data-table";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteSnippet } from "@/lib/actions";
import { Snippet } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Snippet>[] = [
  getSelectColumn<Snippet>(),
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={getRoutePath(ROUTE_PATH.VIEW_SNIPPET, {
            slug: row.original.slug,
          })}
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "lang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language" />
    ),
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
            update: {
              path: getRoutePath(ROUTE_PATH.UPDATE_SNIPPET, {
                slug,
              }),
            },
            delete: {
              action: deleteSnippet.bind(null, id),
            },
          }}
        />
      );
    },
  },
];
