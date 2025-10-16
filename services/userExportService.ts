import { api } from '@/lib/axios';
import protobuf from 'protobufjs';
import type { User } from '@/types/user';

const UserMessage = new protobuf.Type('User')
  .add(new protobuf.Field('id', 1, 'int32'))
  .add(new protobuf.Field('name', 2, 'string'))
  .add(new protobuf.Field('email', 3, 'string'))
  .add(new protobuf.Field('role', 4, 'string'))
  .add(new protobuf.Field('status', 5, 'string'))
  .add(new protobuf.Field('createdAt', 6, 'string'));

const UsersEnvelope = new protobuf.Type('Users')
  .add(new protobuf.Field('users', 1, 'User', 'repeated'));

UsersEnvelope.add(UserMessage);

export interface UsersExport {
  users: User[];
}

export async function fetchUsersExport(): Promise<UsersExport> {
  const res = await api.get<ArrayBuffer>('/users/export', {
    responseType: 'arraybuffer',
  });
  const buffer = new Uint8Array(res.data as unknown as ArrayBuffer);
  const decoded = UsersEnvelope.decode(buffer) as unknown as { users?: any[] };

  const users: User[] = (decoded.users ?? []).map((u) => {
    let createdAt: string | undefined;
    if (u.createdAt !== undefined && u.createdAt !== null) {
      if (typeof u.createdAt === 'number') createdAt = new Date(u.createdAt).toISOString();
      else createdAt = String(u.createdAt);
    }
    return {
      id: Number(u.id),
      name: String(u.name ?? ''),
      email: String(u.email ?? ''),
      role: (String(u.role ?? 'user') as User['role']),
      status: u.status ? String(u.status) : undefined,
      createdAt,
    };
  });

  return { users };
}


