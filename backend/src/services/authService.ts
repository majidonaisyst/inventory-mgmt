import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../types/inventory";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

// Mock users database (in production, use a real database)
const USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@company.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@company.com",
    password: bcrypt.hashSync("manager123", 10),
    role: "manager",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@company.com",
    password: bcrypt.hashSync("viewer123", 10),
    role: "viewer",
  },
];

export const authService = {
  login: async (email: string, password: string) => {
    const user = USERS.find((u) => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET) as any;
    } catch {
      return null;
    }
  },

  getUserById: (id: string) => {
    const user = USERS.find((u) => u.id === id);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
};
