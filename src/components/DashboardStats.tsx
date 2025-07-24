import React from "react";
import { InventoryItem } from "@/types/inventory";
import { generateLowStockSummary } from "@/lib/inventory";

interface DashboardStatsProps {
  items: InventoryItem[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ items }) => {
  const totalItems = items.length;
  const lowStockItems = items.filter(
    (item) => item.status === "Low Stock" || item.quantity <= 5
  );
  const inStockItems = items.filter(
    (item) => item.status === "In Stock" && item.quantity > 5
  );
  const orderedItems = items.filter((item) => item.status === "Ordered");
  const discontinuedItems = items.filter(
    (item) => item.status === "Discontinued"
  );

  const categories = new Set(items.map((item) => item.category)).size;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const [aiSummary, setAiSummary] = React.useState<string>("");
  const [loadingSummary, setLoadingSummary] = React.useState(false);

  React.useEffect(() => {
    if (lowStockItems.length > 0) {
      setLoadingSummary(true);
      generateLowStockSummary()
        .then((summary) => setAiSummary(summary))
        .catch((error) => {
          console.error("Failed to get AI summary:", error);
          setAiSummary(
            `Alert: ${
              lowStockItems.length
            } items need attention. Priority items: ${lowStockItems
              .slice(0, 3)
              .map((item) => item.name)
              .join(", ")}.`
          );
        })
        .finally(() => setLoadingSummary(false));
    } else {
      setAiSummary("All items are well-stocked!");
    }
  }, [lowStockItems.length]);

  return (
    <div className="mb-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {totalItems}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Total Items
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">✅</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {inStockItems.length}
              </div>
              <div className="text-sm text-gray-500 font-medium">In Stock</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">⚠️</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">
                {lowStockItems.length}
              </div>
              <div className="text-sm text-gray-500 font-medium">Low Stock</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🛒</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {orderedItems.length}
              </div>
              <div className="text-sm text-gray-500 font-medium">Ordered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">🏷️</span>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {categories}
              </div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 text-lg">📈</span>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {totalQuantity}
              </div>
              <div className="text-sm text-gray-500">Total Quantity</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-lg">🚫</span>
            </div>
            <div>
              <div className="text-xl font-semibold text-red-600">
                {discontinuedItems.length}
              </div>
              <div className="text-sm text-gray-500">Discontinued</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      {(lowStockItems.length > 0 || aiSummary) && (
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-6 rounded-2xl border border-purple-200 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🤖</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-purple-900 mb-2 text-lg">
                AI Inventory Insights
              </h3>
              {loadingSummary ? (
                <div className="flex items-center gap-2 text-purple-800">
                  <div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                  <span className="text-sm">Analyzing inventory data...</span>
                </div>
              ) : (
                <p className="text-purple-800 leading-relaxed">{aiSummary}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
