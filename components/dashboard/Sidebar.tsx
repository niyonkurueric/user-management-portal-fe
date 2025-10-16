'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Home, Users, Settings, BarChart3 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'users', icon: Users, label: 'Users', path: '/dashboard/users' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header visible only on small screens */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="font-semibold text-gray-900">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.path);

                  // Only close sidebar on small screens
                  if (typeof window !== 'undefined' && window.matchMedia) {
                    const isSmall = window.matchMedia('(max-width: 1023px)').matches; // lg breakpoint
                    if (isSmall) onClose();
                  } else {
                    onClose();
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
