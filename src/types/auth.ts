export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = "admin" | "manager" | "viewer";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export type Permission =
  | "view_inventory"
  | "create_item"
  | "edit_item"
  | "delete_item"
  | "view_stats"
  | "manage_users";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "view_inventory",
    "create_item",
    "edit_item",
    "delete_item",
    "view_stats",
    "manage_users",
  ],
  manager: ["view_inventory", "create_item", "edit_item", "view_stats"],
  viewer: ["view_inventory", "view_stats"],
};

// Mock users for demo (in production, this would come from your backend)
export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@company.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@company.com",
    password: "viewer123",
    role: "viewer",
  },
];
