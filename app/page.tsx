import { NavBar } from '@/components/NavBar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <main className="max-w-4xl mx-auto p-8 text-center">
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/login" className="px-5 py-2 rounded bg-slate-800 text-white">Login</Link>
          <Link href="/dashboard" className="px-5 py-2 rounded border">Go to Dashboard</Link>
        </div>
      </main>
    </div>
  );
}
