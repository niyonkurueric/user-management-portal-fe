'use client';

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "@/components/users/Columns";
import { SearchInput } from "@/components/ui/search-input";
import { useUsers, useDeleteUser } from "@/services/userService";
import { UserFormDialog } from '@/components/users/UserFormDialog';
import DeleteDialog from '@/components/users/DeleteDialog';
import type { User } from '@/types/user';

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const { data: users = [], isLoading, isError } = useUsers();
  const deleteUser = useDeleteUser();

  const [isMounted, setIsMounted] = useState(false);
  const [activeUser, setActiveUser] = useState<{ edit?: User; delete?: User }>({});

  useEffect(() => setIsMounted(true), []);

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">User Management</h2>
        <Button onClick={() => setActiveUser({ edit: {} as User })}>
          Add User
        </Button>

      </div>

      {/* Data Table */}
      <DataTable
        columns={getColumns(
          (u) => setActiveUser(prev => ({ ...prev, edit: u })),
          (u) => setActiveUser(prev => ({ ...prev, delete: u }))
        )}
        data={users}
        topLeft={
          <div className="max-w-md">
            <SearchInput
              placeholder="Search users by name, email, role..."
              value={query}
              className="w-43"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
        topRight={<div />}
      />

      <UserFormDialog
        open={activeUser.edit !== undefined}
        onClose={() => setActiveUser(prev => ({ ...prev, edit: undefined }))}
        initialUser={activeUser.edit}
      />

      <DeleteDialog
        open={activeUser.delete !== undefined}
        onClose={() => setActiveUser(prev => ({ ...prev, delete: undefined }))}
        name={activeUser.delete?.name}
        onConfirm={() => activeUser.delete && deleteUser.mutate(activeUser.delete.id)}
      />
    </Card>
  );
}
