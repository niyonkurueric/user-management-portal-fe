"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginClient() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
      login('fake-jwt-token');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 w-80 border rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4 font-bold text-center">Admin Login</h1>
        <Input placeholder="Email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} className="mb-3" />
        <Input type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} className="mb-4" />
        <Button className="w-full" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}
