"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Permission } from "@/types/auth";

interface PermissionGuardProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionGuard = ({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface RoleIndicatorProps {
  className?: string;
}

export const RoleIndicator = ({ className = "" }: RoleIndicatorProps) => {
  const { user } = useAuth();

  if (!user) return null;

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    manager: "bg-blue-100 text-blue-800",
    viewer: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        roleColors[user.role]
      } ${className}`}
    >
      {user.role.toUpperCase()}
    </span>
  );
};

interface UserProfileProps {
  className?: string;
}

export const UserProfile = ({ className = "" }: UserProfileProps) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.name}
        </p>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
      </div>
      <RoleIndicator />
      <button
        onClick={logout}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Sign out
      </button>
    </div>
  );
};
