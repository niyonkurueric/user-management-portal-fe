import { api } from '@/lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
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
