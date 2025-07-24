import React from "react";
import { InventoryItem } from "@/types/inventory";
import { suggestReorderQuantity } from "@/lib/inventory";

interface ItemCardProps {
  item: InventoryItem;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200";
      case "Low Stock":
        return "bg-gradient-to-r from-yellow-100 to-orange-200 text-yellow-800 border-yellow-200";
      case "Ordered":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200";
      case "Discontinued":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return "✅";
      case "Low Stock":
        return "⚠️";
      case "Ordered":
        return "🛒";
      case "Discontinued":
        return "🚫";
      default:
        return "📦";
    }
  };

  const [showAISuggestion, setShowAISuggestion] = React.useState(false);
  const [suggestedQuantity, setSuggestedQuantity] = React.useState<
    number | null
  >(null);
  const [loadingSuggestion, setLoadingSuggestion] = React.useState(false);

  const handleAISuggestion = async () => {
    if (!showAISuggestion && !suggestedQuantity) {
      setLoadingSuggestion(true);
      try {
        const quantity = await suggestReorderQuantity(item);
        setSuggestedQuantity(quantity);
      } catch (error) {
        console.error("Failed to get AI suggestion:", error);
        setSuggestedQuantity(15); // fallback
      } finally {
        setLoadingSuggestion(false);
      }
    }
    setShowAISuggestion(!showAISuggestion);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">📦</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-xl text-xs font-semibold border ${getStatusColor(
            item.status
          )} flex items-center gap-1`}
        >
          <span>{getStatusIcon(item.status)}</span>
          {item.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {item.description}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
            Quantity
          </div>
          <div
            className={`text-lg font-bold ${
              item.quantity <= 5 ? "text-red-600" : "text-gray-900"
            }`}
          >
            {item.quantity}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
            Category
          </div>
          <div className="text-lg font-bold text-gray-900">{item.category}</div>
        </div>
      </div>

      {(item.status === "Low Stock" || item.quantity <= 5) && (
        <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <span className="text-sm font-semibold text-yellow-800">
                Low Stock Alert
              </span>
            </div>
            <button
              onClick={handleAISuggestion}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              disabled={loadingSuggestion}
            >
              {loadingSuggestion ? "Loading..." : "🤖 AI Suggestion"}
            </button>
          </div>
          {showAISuggestion && suggestedQuantity && (
            <div className="mt-3 p-3 bg-white bg-opacity-60 rounded-lg border border-yellow-300">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-600">🤖</span>
                <span className="font-medium">Suggested reorder quantity:</span>
                <span className="font-bold text-blue-600">
                  {suggestedQuantity}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};
