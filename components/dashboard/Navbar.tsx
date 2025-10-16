"use client";

import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/common/UserAvatar";

interface NavBarProps {
  onMenuClick?: () => void;
}

export function NavBar({ onMenuClick }: NavBarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">UserPortal</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-white bg-white"
            >
              <UserAvatar name={user?.name} />
              <span className="text-sm text-gray-800 hidden sm:block">
                {user?.name ?? "Account"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </Button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Settings
                </a>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                    router.replace("/login");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
