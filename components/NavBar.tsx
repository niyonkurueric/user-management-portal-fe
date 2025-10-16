"use client";

import Link from 'next/link';

export function NavBar() {
  return (
    <nav className="w-full border-b bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">User Management</Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm px-3 py-1 rounded hover:bg-slate-100">Login</Link>
          <Link href="/dashboard" className="text-sm px-3 py-1 rounded bg-slate-800 text-white hover:opacity-95">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
