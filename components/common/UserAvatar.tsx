"use client";

import { User as UserIcon } from "lucide-react";
import * as React from "react";

interface Props {
  name?: string | null;
  className?: string;
}

export function UserAvatar({ name, className }: Props) {
  const initials = React.useMemo(() => {
    if (!name) return null;
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [name]);

  return (
    <div
      className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ${
        className ?? ""
      }`}
    >
      {initials ? (
        <span className="text-sm font-semibold text-gray-700">{initials}</span>
      ) : (
        <UserIcon className="w-4 h-4 text-gray-600" />
      )}
    </div>
  );
}
