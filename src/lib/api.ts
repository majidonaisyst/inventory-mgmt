const API_BASE_URL = "http://localhost:4001/api";

export const inventoryAPI = {
  // Get all inventory items
  getAllItems: async () => {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    if (!response.ok) throw new Error("Failed to fetch items");
    return response.json();
  },

  // Get single item
  getItem: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`);
    if (!response.ok) throw new Error("Failed to fetch item");
    return response.json();
  },

  // Create new item
  createItem: async (data: {
    name: string;
    quantity: number;
    category: string;
    description: string;
    status?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create item");
    return response.json();
  },

  // Update item
  updateItem: async (
    id: string,
    data: {
      name?: string;
      quantity?: number;
      category?: string;
      description?: string;
      status?: string;
    }
  ) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update item");
    return response.json();
  },

  // Delete item
  deleteItem: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return response.json();
  },

  // Get AI reorder suggestion
  getReorderSuggestion: async (id: string) => {
    const response = await fetch(
      `${API_BASE_URL}/inventory/${id}/suggest-reorder`
    );
    if (!response.ok) throw new Error("Failed to get reorder suggestion");
    return response.json();
  },

  // Get AI low stock summary
  getLowStockSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/summary/low-stock`);
    if (!response.ok) throw new Error("Failed to get low stock summary");
    return response.json();
  },
};
