import { api } from '@/lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { fetchUsersExport } from '@/services/userExportService';

const normalizeUser = (u: any): User => ({
  id: Number(u.id),
  name: String(u.name ?? ''),
  email: String(u.email ?? ''),
  role: (String(u.role ?? 'user') as User['role']),
  status: u.status ? String(u.status) : undefined,
  createdAt: u.createdAt
    ? String(u.createdAt).trim()
    : (u.created_at ? String(u.created_at).trim() : undefined),
});

const fetchUsers = async (): Promise<User[]> => {
  try {
    const exported = await fetchUsersExport();
    if (exported?.users?.length) return exported.users.map(normalizeUser);
  } catch (_) {}
  const { data } = await api.get('/users');
  const arr = Array.isArray(data) ? data : (Array.isArray(data?.users) ? data.users : []);
  return arr.map(normalizeUser);
};

const createUser = async (user: Partial<User>) => {
  const { data } = await api.post('/users', user);
  return data;
};

const updateUser = async (user: User) => {
  const { data } = await api.put(`/users/${user.id}`, user);
  return data;
};

const deleteUser = async (id: number) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};

export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: fetchUsers });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};
