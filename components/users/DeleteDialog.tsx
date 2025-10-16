"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteDialog({ open, onClose, onConfirm, name }: { open: boolean; onClose: () => void; onConfirm: () => void; name?: string }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete {name ?? 'this user'}? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={() => { onConfirm(); onClose(); }}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
