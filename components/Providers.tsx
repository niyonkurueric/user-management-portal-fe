"use client";

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
