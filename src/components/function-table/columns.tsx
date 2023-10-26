"use client";

import { ColumnDef, filterFns } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/components/ui/use-toast";

import { Function } from "@/lib/languages";

export const columns: ColumnDef<Function>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "parameters",
    header: "Parameters",
    cell: ({ row }) => {
      // string[] -> string
      return row.original.parameters.join(", ");
    },
    filterFn: filterFns.arrIncludesAll,
  },
  {
    accessorKey: "returnType",
    header: "Return Type",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const { original } = row;
      const { toast } = useToast();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={async () => {
                navigator.clipboard.writeText(original.body).then(() => {
                  toast({
                    title: "Copied!",
                    description: <span>Function <code>{original.name}</code> copied successfully!</span>
                  });
                });
              }}
            >
              Copy Function
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
