import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  role: z.enum(['admin', 'user']),
});

export type UserCreate = z.infer<typeof userSchema>;
