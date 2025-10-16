"use client";


import React, { useState } from 'react';
import { NavBar } from '@/components/dashboard/Navbar';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <section className="min-h-screen bg-slate-50">
      <NavBar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </section>
  );
}
