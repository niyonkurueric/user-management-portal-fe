// services/userService.ts
import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/user";
import { fetchUsersExport, UsersExport } from "@/services/userExportService";

const normalizeUser = (u: any): User => ({
  id: Number(u.id),
  name: String(u.name ?? ""),
  email: String(u.email ?? ""),
  ogEmail: String(u.ogEmail ?? ""),
  role: String(u.role ?? "user") as User["role"],
  status: u.status ? String(u.status) : undefined,
  createdAt: u.createdAt ? String(u.createdAt).trim() : undefined,
});

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const exported: UsersExport = await fetchUsersExport();
    return exported.users.map(normalizeUser);
  } catch (_) {
    const { data } = await api.get("/users");
    const arr = Array.isArray(data) ? data : (Array.isArray(data?.users) ? data.users : []);
    return arr.map(normalizeUser);
  }
};

export const useUsersExport = () =>
  useQuery({ queryKey: ["users", "export"], queryFn: fetchUsersExport });

export const useUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: fetchUsers });

const createUser = async (user: Partial<User>) => (await api.post("/users", user)).data;
const updateUser = async (user: User) => (await api.put(`/users/${user.id}`, user)).data;
const deleteUser = async (id: number) => (await api.delete(`/users/${id}`)).data;

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
