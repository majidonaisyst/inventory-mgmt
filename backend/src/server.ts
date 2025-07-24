import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { InventoryService } from "./services/inventoryService";

const app = express();
const PORT = process.env.PORT || 4001;
const inventoryService = new InventoryService();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// GET /api/inventory - Get all inventory items
app.get("/api/inventory", (req, res) => {
  try {
    const items = inventoryService.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventory items" });
  }
});

// GET /api/inventory/:id - Get single inventory item
app.get("/api/inventory/:id", (req, res) => {
  try {
    const item = inventoryService.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventory item" });
  }
});

// POST /api/inventory - Create new inventory item
app.post("/api/inventory", (req, res) => {
  try {
    const { name, quantity, category, description, status } = req.body;

    if (!name || quantity === undefined || !category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, quantity, category" });
    }

    const newItem = inventoryService.createItem({
      name,
      quantity: parseInt(quantity),
      category,
      description: description || "",
      status,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create inventory item" });
  }
});

// PUT /api/inventory/:id - Update inventory item
app.put("/api/inventory/:id", (req, res) => {
  try {
    const { name, quantity, category, description, status } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (quantity !== undefined) updateData.quantity = parseInt(quantity);
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const updatedItem = inventoryService.updateItem(req.params.id, updateData);

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update inventory item" });
  }
});

// DELETE /api/inventory/:id - Delete inventory item
app.delete("/api/inventory/:id", (req, res) => {
  try {
    const deleted = inventoryService.deleteItem(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
});

// GET /api/inventory/:id/suggest-reorder - Get AI reorder suggestion
app.get("/api/inventory/:id/suggest-reorder", (req, res) => {
  try {
    const item = inventoryService.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const suggestion = inventoryService.suggestReorderQuantity(item);
    res.json({ itemId: item.id, suggestedQuantity: suggestion });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate reorder suggestion" });
  }
});

// GET /api/summary/low-stock - Get AI low stock summary
app.get("/api/summary/low-stock", (req, res) => {
  try {
    const summary = inventoryService.generateLowStockSummary();
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate low stock summary" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Inventory Management Backend running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
