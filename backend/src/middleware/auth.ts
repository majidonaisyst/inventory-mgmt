import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import { AuthRequest } from "../types/inventory";

// Simple auth middleware
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const decoded = authService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid token." });
  }

  const user = authService.getUserById(decoded.userId);
  if (!user) {
    return res.status(401).json({ error: "User not found." });
  }

  req.user = user as any;
  next();
};

// Simple role-based permission middleware
export const requirePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const permissions = {
      admin: ["view", "create", "edit", "delete"],
      manager: ["view", "create", "edit"],
      viewer: ["view"],
    };

    const userPermissions = permissions[req.user.role] || [];

    if (!userPermissions.includes(permission)) {
      return res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
    }

    next();
  };
};
