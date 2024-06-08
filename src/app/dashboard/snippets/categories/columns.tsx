"use client";

import EntityActions from "@/components/EntityActions";
import {
  DataTableColumnHeader,
  getSelectColumn,
} from "@/components/ui/data-table";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteSnippetCategory } from "@/lib/actions";
import { SnippetCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SnippetCategory>[] = [
  getSelectColumn<SnippetCategory>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "_count.snippets",
    id: "snippets",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Snippets" />
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
              path: getRoutePath(ROUTE_PATH.UPDATE_SNIPPET_CATEGORY, {
                slug,
              }),
            },
            delete: {
              action: deleteSnippetCategory.bind(null, id),
            },
            view: {
              path: getRoutePath(ROUTE_PATH.VIEW_SNIPPET_CATEGORY, {
                slug,
              }),
            },
          }}
        />
      );
    },
  },
];
