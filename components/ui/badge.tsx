import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'success' | 'error' | 'default';

function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium';
  const variants: Record<Variant, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}

export { Badge };
