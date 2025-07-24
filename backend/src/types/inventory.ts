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
