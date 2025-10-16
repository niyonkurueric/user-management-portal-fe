"use client";

import { useCreateUser, useUpdateUser } from '@/services/userService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import type { Role, User } from '@/types/user';
import { AlertCircle, Loader2, UserPlus, Save } from 'lucide-react';
import { userSchema } from '@/schemas/users/user';
import type { ZodIssue } from 'zod';
import type { z } from 'zod';

interface Props {
  initialUser?: User | null;
  onClose: () => void;
}

export const UserFormContent = ({ initialUser, onClose }: Props) => {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  type FormData = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialUser?.name ?? '',
      email: initialUser?.email ?? '',
      role: initialUser?.role ?? 'user',
    } as Partial<FormData>,
  });

  useEffect(() => {
    reset({
      name: initialUser?.name ?? '',
      email: initialUser?.email ?? '',
      role: initialUser?.role ?? 'user',
    } as Partial<FormData>);
  }, [initialUser, reset]);

  const formatZodIssue = (issue: ZodIssue) => {
    if (issue.code === 'invalid_type') {
      const typed = issue as unknown as { expected?: string; received?: string };
      const expected = String(typed.expected ?? 'value');
      const received = String(typed.received ?? 'unknown');
      return `Invalid input: expected ${expected}, received ${received}`;
    }
    return String(issue.message ?? 'Invalid input');
  };

  const onSubmit = (data: FormData) => {
    if (initialUser?.id) {
      updateUser.mutate({ ...(initialUser as User), ...data }, {
        onSuccess: () => {
          toast.success('User updated successfully');
          onClose();
        },
        onError: () => toast.error('Failed to update user'),
      });
    } else {
      createUser.mutate(data as Partial<User>, {
        onSuccess: () => {
          toast.success('User created successfully');
          onClose();
        },
        onError: (error) => toast.error(error?.message || 'Failed to create user'),
      });
    }
  };

  const isLoading = createUser.isPending || updateUser.isPending || isSubmitting;

  const watchedName = watch('name');
  const watchedEmail = watch('email');

  return (
    <div className="space-y-5">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          onBlur={() => {
            // trigger validation by calling get on errors via formState; react-hook-form automatically runs
          }}
          className={`transition-all ${errors.name
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'focus-visible:ring-blue-500'
            }`}
          placeholder="Enter full name"
          disabled={isLoading}
          value={watchedName ?? ''}
        />
        {errors.name && (
          <div className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.name?.message ?? formatZodIssue(errors.name as unknown as ZodIssue)}</span>
          </div>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          onBlur={() => { }}
          className={`transition-all ${errors.email
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'focus-visible:ring-blue-500'
            }`}
          placeholder="user@example.com"
          disabled={isLoading}
          value={watchedEmail ?? ''}
        />
        {errors.email && (
          <div className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.email?.message ?? formatZodIssue(errors.email as unknown as ZodIssue)}</span>
          </div>
        )}
      </div>

      {/* Role Field */}
      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-medium text-gray-700">
          Role
        </Label>
        <Select
          value={watch('role') ?? 'user'}
          onValueChange={(v) => setValue('role', v as Role)}
          disabled={isLoading}
        >
          <SelectTrigger id="role" className="focus:ring-blue-500">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">
              <div className="flex items-center gap-2">
                <span className="font-medium">Admin</span>
                <span className="text-xs text-gray-500">Full access</span>
              </div>
            </SelectItem>
            <SelectItem value="user">
              <div className="flex items-center gap-2">
                <span className="font-medium">User</span>
                <span className="text-xs text-gray-500">Standard access</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading || !(String(watchedName ?? '').trim() && String(watchedEmail ?? '').trim())}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialUser ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              {initialUser?.id ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update User
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserFormContent;