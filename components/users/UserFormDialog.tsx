'use client';

import UserFormContent from '@/components/users/UserForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { User } from '@/types/user';

export function UserFormDialog({ open, onClose, initialUser }: { open: boolean; onClose: () => void; initialUser?: User | null }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialUser ? 'Edit User' : 'Create User'}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <UserFormContent initialUser={initialUser} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
