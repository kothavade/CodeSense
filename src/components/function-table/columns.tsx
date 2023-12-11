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
      return (
        <div className="flex flex-row gap-1 overflow-auto max-w-[200px] items-center scrollbar-none">
          {row.original.parameters.map((p, idx) => (
            <div key={idx} className="flex flex-row items-center">
              <span className="">{p.name}</span>
              <span className=" text-muted-foreground">:</span>
              <span className=" text-muted-foreground">{p.type}</span>
              {idx !== row.original.parameters.length - 1 && (
                <span className=" text-muted-foreground">{", "}</span>
              )}
            </div>
          ))}
        </div>
      )
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
