"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileText, MoreHorizontal, PenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteSong from "./delete-assignment";
import Link from "next/link";
import { Review } from "@/types/reviews";

export type Assignment = {
  id: string;
  user_id: string;
  title: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  reviews: Review[];
};

export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "reviews",
    header: () => <div>Reviews</div>,
    cell: ({ row }) => {
      const reviews: Review[] = row.original.reviews;
      return (
        <div className="flex items-center p-3">
          <p className="text-sm font-medium text-gray-900 truncate">
            {reviews?.length}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="">Submission Date</div>,
    cell: ({ row }) => {
      const dateStr: string = row.getValue("created_at");
      const date = new Date(dateStr);

      const options = { year: "numeric", month: "long", day: "numeric" };
      // @ts-expect-error
      const formattedDate = date.toLocaleDateString("en-US", options);

      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      const id: string = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/update-submission?id=${row.original.id}`}
                className="flex flex-row justify-center items-center gap-2"
              >
                <PenIcon />
                Update
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteSong id={id} title={title} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
