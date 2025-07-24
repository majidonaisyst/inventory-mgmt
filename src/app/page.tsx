"use client";

import React, { useState, useEffect } from "react";
import { InventoryItem, ItemStatus, CreateItemData } from "@/types/inventory";
import {
  loadInventoryData,
  saveInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "@/lib/inventory";
import { ItemCard } from "@/components/ItemCard";
import { ItemForm } from "@/components/ItemForm";
import { SearchFilter } from "@/components/SearchFilter";
import { DashboardStats } from "@/components/DashboardStats";

export default function Home() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ItemStatus | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadInventoryData();
        setItems(data);
        setError(null);
      } catch (err) {
        setError("Failed to load inventory data");
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (data: CreateItemData) => {
    try {
      const newItem = await saveInventoryItem(data);
      setItems((prevItems) => [...prevItems, newItem]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError("Failed to add item");
      console.error("Failed to add item:", err);
    }
  };

  const handleEditItem = async (data: CreateItemData) => {
    if (!editingItem) return;

    try {
      const updatedItem = await updateInventoryItem(editingItem.id, data);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );
      setEditingItem(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError("Failed to update item");
      console.error("Failed to update item:", err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteInventoryItem(id);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setError(null);
      } catch (err) {
        setError("Failed to delete item");
        console.error("Failed to delete item:", err);
      }
    }
  };

  const openEditForm = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesCategory = !categoryFilter || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(items.map((item) => item.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            Loading Inventory
          </div>
          <div className="text-gray-500">
            Please wait while we fetch your data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📦</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Inventory Management
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Manage your inventory with AI-powered insights and real-time
                analytics
              </p>
              {error && (
                <div className="mt-4 flex items-center gap-2 text-sm text-red-700 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                  <span className="text-red-500">⚠️</span>
                  {error}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Add New Item
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats items={items} />

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={categories}
        />

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={openEditForm}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-gray-300 text-8xl mb-6">📦</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {items.length === 0 ? "No Items Yet" : "No Results Found"}
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                {items.length === 0
                  ? "Start building your inventory by adding your first item!"
                  : "Try adjusting your search filters to find what you're looking for."}
              </p>
              {items.length === 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Add Your First Item
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <ItemForm
            item={editingItem || undefined}
            onSubmit={editingItem ? handleEditItem : handleAddItem}
            onCancel={closeForm}
          />
        )}
      </div>
    </div>
  );
}
