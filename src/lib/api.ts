const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("inventory_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  description: string;
  status: "In Stock" | "Low Stock" | "Ordered" | "Discontinued";
}

export const getInventoryItems = async (): Promise<InventoryItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch items");
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

export const addInventoryItem = async (
  item: Omit<InventoryItem, "id">
): Promise<InventoryItem> => {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return await response.json();
};

export const updateInventoryItem = async (
  id: string,
  item: Partial<InventoryItem>
): Promise<InventoryItem> => {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Failed to update item");
  return await response.json();
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete item");
};

export const getSuggestedReorderQuantity = async (
  id: string
): Promise<{ suggestion: number; reasoning: string }> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/inventory/${id}/suggest-reorder`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) throw new Error("Failed to get suggestion");
    return await response.json();
  } catch (error) {
    return {
      suggestion: 10,
      reasoning: "Unable to connect to AI service. Showing default suggestion.",
    };
  }
};

export const generateLowStockSummary = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/summary/low-stock`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to get summary");
    const data = await response.json();
    return data.summary;
  } catch (error) {
    return "Unable to generate AI summary at this time.";
  }
};

// Default export object with all API functions
const inventoryAPI = {
  getInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getSuggestedReorderQuantity,
  generateLowStockSummary,
};

export default inventoryAPI;
