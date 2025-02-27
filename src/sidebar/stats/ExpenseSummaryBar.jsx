import React from "react";
import { Search } from "lucide-react";

const ExpenseSummaryBar = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Total Spent and Filter */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <div>
          <p className="text-red-500 font-semibold text-xl">$14,272.00</p>
          <p className="text-gray-500 text-sm">Total Spent</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1 rounded-lg bg-blue-500 text-white font-medium">Weekly</button>
          <button className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-medium">Monthly</button>
          <button className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-medium">Yearly</button>
          <button className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-medium">Custom</button>
        </div>
        <button className="bg-red-100 text-red-500 p-3 rounded-full">
          🛒
        </button>
      </div>

      {/* Financial Health */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Financial Health</p>
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 font-medium">Good</span>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">Savings Rate</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '78.2%' }}></div>
          </div>
          <p className="text-right text-gray-500 text-sm mt-1">78.2%</p>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <p className="font-semibold text-lg">Top Categories</p>

        {/* Home Category */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <img src="https://img.icons8.com/ios-filled/50/795548/home.png" alt="Home" width={32} height={32} />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Home</p>
            <p className="text-gray-500 text-sm">61.6% of spending</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-amber-700 h-2 rounded-full" style={{ width: '61.6%' }}></div>
            </div>
          </div>
          <p className="text-right font-semibold">$8,790.00</p>
        </div>

        {/* Bills & Fees Category */}
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <img src="https://img.icons8.com/ios-filled/50/4CAF50/money.png" alt="Bills" width={32} height={32} />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Bills & fees</p>
            <p className="text-gray-500 text-sm">38.4% of spending</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '38.4%' }}></div>
            </div>
          </div>
          <p className="text-right font-semibold">$5,482.00</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummaryBar;
