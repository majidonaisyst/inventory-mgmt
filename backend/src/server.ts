import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5151;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, "..", "data");
const dataFile = path.join(dataDir, "inventory.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize with sample data if file doesn't exist
if (!fs.existsSync(dataFile)) {
  const sampleData = [
    {
      id: "1",
      name: 'MacBook Pro 16"',
      quantity: 12,
      category: "Electronics",
      description: "Latest MacBook Pro with M3 chip",
      status: "In Stock",
    },
    {
      id: "2",
      name: "Office Chair",
      quantity: 3,
      category: "Furniture",
      description: "Ergonomic office chair with lumbar support",
      status: "Low Stock",
    },
    {
      id: "3",
      name: "Wireless Mouse",
      quantity: 25,
      category: "Electronics",
      description: "Bluetooth wireless mouse",
      status: "In Stock",
    },
    {
      id: "4",
      name: "Standing Desk",
      quantity: 0,
      category: "Furniture",
      description: "Height adjustable standing desk",
      status: "Ordered",
    },
    {
      id: "5",
      name: "USB-C Hub",
      quantity: 8,
      category: "Electronics",
      description: "7-in-1 USB-C hub with HDMI",
      status: "In Stock",
    },
  ];

  fs.writeFileSync(dataFile, JSON.stringify(sampleData, null, 2));
}

// Helper functions
const readInventory = () => {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading inventory:", error);
    return [];
  }
};

const writeInventory = (data: any[]) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing inventory:", error);
  }
};

// Routes
app.get("/api/inventory", (req, res) => {
  const inventory = readInventory();
  res.json(inventory);
});

app.post("/api/inventory", (req, res) => {
  const inventory = readInventory();
  const newItem = {
    id: Date.now().toString(),
    ...req.body,
    status:
      req.body.quantity <= 5 ? "Low Stock" : req.body.status || "In Stock",
  };

  inventory.push(newItem);
  writeInventory(inventory);
  res.status(201).json(newItem);
});

app.put("/api/inventory/:id", (req, res) => {
  const inventory = readInventory();
  const itemIndex = inventory.findIndex(
    (item: any) => item.id === req.params.id
  );

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const updatedItem = {
    ...inventory[itemIndex],
    ...req.body,
    status:
      req.body.quantity <= 5
        ? "Low Stock"
        : req.body.status || inventory[itemIndex].status,
  };

  inventory[itemIndex] = updatedItem;
  writeInventory(inventory);
  res.json(updatedItem);
});

app.delete("/api/inventory/:id", (req, res) => {
  const inventory = readInventory();
  const filteredInventory = inventory.filter(
    (item: any) => item.id !== req.params.id
  );

  if (inventory.length === filteredInventory.length) {
    return res.status(404).json({ error: "Item not found" });
  }

  writeInventory(filteredInventory);
  res.json({ message: "Item deleted successfully" });
});

app.get("/api/inventory/:id/suggest-reorder", (req, res) => {
  const inventory = readInventory();
  const item = inventory.find((item: any) => item.id === req.params.id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  const suggestion = Math.max(
    10,
    item.quantity * 2 + Math.floor(Math.random() * 10)
  );
  res.json({
    suggestion,
    reasoning: `Based on current stock (${item.quantity}) and usage patterns, we recommend ordering ${suggestion} units to maintain optimal inventory levels.`,
  });
});

app.get("/api/summary/low-stock", (req, res) => {
  const inventory = readInventory();
  const lowStockItems = inventory.filter((item: any) => item.quantity <= 5);

  if (lowStockItems.length === 0) {
    return res.json({ summary: "All items are well-stocked!" });
  }

  const summary = `Alert: ${
    lowStockItems.length
  } items need attention. Priority reorders: ${lowStockItems
    .slice(0, 3)
    .map((item: any) => `${item.name} (${item.quantity} left)`)
    .join(", ")}. Total categories affected: ${
    new Set(lowStockItems.map((item: any) => item.category)).size
  }.`;

  res.json({ summary });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
