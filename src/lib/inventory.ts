import { InventoryItem } from "@/types/inventory";
import inventoryAPI from "./api";

// Mock data for initial inventory (fallback if API is not available)
export const mockInventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Laptop Computer",
    quantity: 15,
    category: "Electronics",
    description: "High-performance business laptop",
    status: "In Stock",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Office Chair",
    quantity: 3,
    category: "Furniture",
    description: "Ergonomic office chair with lumbar support",
    status: "Low Stock",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "3",
    name: "Wireless Mouse",
    quantity: 25,
    category: "Electronics",
    description: "Bluetooth wireless mouse with precision tracking",
    status: "In Stock",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    name: "Printer Paper",
    quantity: 0,
    category: "Office Supplies",
    description: "A4 white printer paper, 500 sheets per pack",
    status: "Ordered",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "5",
    name: "Standing Desk",
    quantity: 2,
    category: "Furniture",
    description: "Height-adjustable standing desk",
    status: "Low Stock",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "6",
    name: "USB Cable",
    quantity: 50,
    category: "Electronics",
    description: "USB-C to USB-A cables, 6ft length",
    status: "In Stock",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "7",
    name: "Old Monitor",
    quantity: 5,
    category: "Electronics",
    description: "Legacy CRT monitor - discontinued model",
    status: "Discontinued",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2024-01-15"),
  },
];

// API-based data operations
export const loadInventoryData = async (): Promise<InventoryItem[]> => {
  try {
    const data = await inventoryAPI.getInventoryItems();
    return data.map((item: Omit<InventoryItem, "createdAt" | "updatedAt">) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  } catch (error) {
    console.error(
      "Failed to load inventory data from API, using mock data:",
      error
    );
    return mockInventoryData;
  }
};

export const saveInventoryItem = async (
  item: Partial<InventoryItem> & {
    name: string;
    quantity: number;
    category: string;
    description: string;
  }
): Promise<InventoryItem> => {
  try {
    // Ensure status is set if not provided
    const itemToSave = {
      ...item,
      status: item.status || ("In Stock" as const),
    };
    const data = await inventoryAPI.addInventoryItem(itemToSave);
    return {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Failed to save inventory item:", error);
    throw error;
  }
};

export const updateInventoryItem = async (
  id: string,
  updates: Partial<InventoryItem>
): Promise<InventoryItem> => {
  try {
    const data = await inventoryAPI.updateInventoryItem(id, updates);
    return {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Failed to update inventory item:", error);
    throw error;
  }
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  try {
    await inventoryAPI.deleteInventoryItem(id);
  } catch (error) {
    console.error("Failed to delete inventory item:", error);
    throw error;
  }
};

// AI suggestion function - now uses API
export const suggestReorderQuantity = async (
  item: InventoryItem
): Promise<number> => {
  try {
    const response = await inventoryAPI.getSuggestedReorderQuantity(item.id);
    return response.suggestion;
  } catch (error) {
    console.error(
      "Failed to get AI reorder suggestion, using fallback:",
      error
    );
    // Fallback to mock logic
    const baseReorder = Math.max(10, item.quantity * 2);
    const randomVariation = Math.floor(Math.random() * 10) - 5;
    return Math.max(5, baseReorder + randomVariation);
  }
};

export const generateLowStockSummary = async (): Promise<string> => {
  try {
    const response = await inventoryAPI.generateLowStockSummary();
    return response;
  } catch (error) {
    console.error("Failed to get AI low stock summary, using fallback:", error);
    // Fallback logic
    return "Unable to generate AI summary at this time.";
  }
};
