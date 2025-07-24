import fs from "fs";
import path from "path";
import {
  InventoryItem,
  CreateItemData,
  UpdateItemData,
} from "../types/inventory";

const DATA_FILE = path.join(__dirname, "../data/inventory.json");

export class InventoryService {
  private readData(): InventoryItem[] {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading inventory data:", error);
      return [];
    }
  }

  private writeData(items: InventoryItem[]): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
    } catch (error) {
      console.error("Error writing inventory data:", error);
      throw new Error("Failed to save data");
    }
  }

  private updateItemStatus(item: InventoryItem): InventoryItem {
    if (
      item.quantity <= 5 &&
      item.status !== "Ordered" &&
      item.status !== "Discontinued"
    ) {
      return { ...item, status: "Low Stock" };
    }
    return item;
  }

  getAllItems(): InventoryItem[] {
    return this.readData().map(this.updateItemStatus);
  }

  getItemById(id: string): InventoryItem | null {
    const items = this.readData();
    const item = items.find((item) => item.id === id);
    return item ? this.updateItemStatus(item) : null;
  }

  createItem(data: CreateItemData): InventoryItem {
    const items = this.readData();
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      ...data,
      status: data.quantity <= 5 ? "Low Stock" : data.status || "In Stock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    items.push(newItem);
    this.writeData(items);
    return newItem;
  }

  updateItem(id: string, data: Partial<CreateItemData>): InventoryItem | null {
    const items = this.readData();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return null;
    }

    const updatedItem: InventoryItem = {
      ...items[itemIndex],
      ...data,
      status:
        data.quantity !== undefined && data.quantity <= 5
          ? "Low Stock"
          : data.status || items[itemIndex].status,
      updatedAt: new Date().toISOString(),
    };

    items[itemIndex] = updatedItem;
    this.writeData(items);
    return this.updateItemStatus(updatedItem);
  }

  deleteItem(id: string): boolean {
    const items = this.readData();
    const filteredItems = items.filter((item) => item.id !== id);

    if (filteredItems.length === items.length) {
      return false; // Item not found
    }

    this.writeData(filteredItems);
    return true;
  }

  // AI feature mocks
  suggestReorderQuantity(item: InventoryItem): number {
    const baseReorder = Math.max(10, item.quantity * 2);
    const randomVariation = Math.floor(Math.random() * 10) - 5;
    return Math.max(5, baseReorder + randomVariation);
  }

  generateLowStockSummary(): string {
    const items = this.getAllItems();
    const lowStockItems = items.filter(
      (item) => item.status === "Low Stock" || item.quantity <= 5
    );

    if (lowStockItems.length === 0) return "All items are well-stocked!";

    const categories = [...new Set(lowStockItems.map((item) => item.category))];
    const totalItems = lowStockItems.length;

    return `Alert: ${totalItems} items need attention across ${
      categories.length
    } categories (${categories.join(", ")}). Priority items: ${lowStockItems
      .slice(0, 3)
      .map((item) => item.name)
      .join(", ")}.`;
  }
}
