"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { formatDateSafe } from "@/lib/date";
// import { useDeleteUser } from "@/services/userService";
export const getColumns = (
  onEdit?: (user: User) => void,
  onDelete?: (user: User) => void
): ColumnDef<User>[] => [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("name")}</div>,
    },
    // {
    //   accessorKey: "email",
    //   header: "Email",
    // },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span className="capitalize text-gray-700">{row.getValue("role")}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as unknown;
        const formatted = formatDateSafe(date);
        return formatted === "—" ? (
          <span className="text-gray-400">—</span>
        ) : (
          <span className="text-gray-800">{formatted}</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        // const deleteUser = useDeleteUser();

        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => (onEdit ? onEdit(user) : toast.success(`Editing user: ${user.name}`))}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={() => (onDelete ? onDelete(user) : null)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
