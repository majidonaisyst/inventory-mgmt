import express from "express";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  description: string;
  status: "In Stock" | "Low Stock" | "Ordered" | "Discontinued";
  createdAt: string;
  updatedAt: string;
}

export type ItemStatus = "In Stock" | "Low Stock" | "Ordered" | "Discontinued";

export interface CreateItemData {
  name: string;
  quantity: number;
  category: string;
  description: string;
  status?: ItemStatus;
}

export interface UpdateItemData extends Partial<CreateItemData> {
  id: string;
}

// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "viewer";
}

export interface AuthRequest extends express.Request {
  user?: User;
}

export type UserRole = "admin" | "manager" | "viewer";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, "password">;
  token: string;
}

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password">;
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
