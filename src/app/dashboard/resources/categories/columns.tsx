"use client";

import EntityActions from "@/components/EntityActions";
import {
  DataTableColumnHeader,
  getSelectColumn,
} from "@/components/ui/data-table";
import { ROUTE_PATH } from "@/constants";
import { getRoutePath } from "@/helpers/route.helpers";
import { deleteResourceCategory } from "@/lib/actions";
import { ResourceCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ResourceCategory>[] = [
  getSelectColumn<ResourceCategory>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "_count.resources",
    id: "Resources",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resources" />
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
              path: getRoutePath(ROUTE_PATH.UPDATE_RESOURCE_CATEGORY, {
                slug,
              }),
            },
            delete: {
              action: deleteResourceCategory.bind(null, id),
            },
          }}
        />
      );
    },
  },
];
