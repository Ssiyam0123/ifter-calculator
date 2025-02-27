import React from "react";
import { Search } from "lucide-react";

const ExpenseSummary = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with Search and Date */}
      <div className="flex justify-between items-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none">
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
        </select>
      </div>

      {/* Earnings, Expenses, Balance */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="flex justify-between">
          <span>Today Earnings</span>
          <span className="text-green-600 font-semibold">$65,330.00</span>
        </div>
        <div className="flex justify-between">
          <span>Today Expenses</span>
          <span className="text-red-500 font-semibold">$14,272.00</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Balance</span>
          <span className="text-blue-600 font-semibold">$51,058.00</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Total Amount</span>
          <span className="text-purple-600 font-semibold">$79,602.00</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        <button className="w-1/2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium">Daily</button>
        <button className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 font-medium">Recurring</button>
      </div>

      {/* Expenses and Income */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expenses */}
        <div>
          <h3 className="font-semibold text-lg text-red-500 flex items-center gap-1">Expenses</h3>
          <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <img src="https://img.icons8.com/ios-filled/50/4CAF50/money.png" alt="Bills" width={32} height={32} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Bills & fees</p>
              <p className="text-gray-500 text-sm">nooooo</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-semibold">-$5,482.00</p>
              <p className="text-gray-400 text-xs">26 Feb</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center mt-2">
            <div className="bg-gray-100 p-3 rounded-full">
              <img src="https://img.icons8.com/ios-filled/50/795548/home.png" alt="Home" width={32} height={32} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Home</p>
              <p className="text-gray-500 text-sm">-</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-semibold">-$8,790.00</p>
              <p className="text-gray-400 text-xs">26 Feb</p>
            </div>
          </div>
        </div>

        {/* Income */}
        <div>
          <h3 className="font-semibold text-lg text-green-500 flex items-center gap-1">Income</h3>
          <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <img src="https://img.icons8.com/ios-filled/50/4CAF50/salary.png" alt="Salary" width={32} height={32} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Salary</p>
              <p className="text-gray-500 text-sm">-</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-semibold">+$65,330.00</p>
              <p className="text-gray-400 text-xs">26 Feb</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600">
          +
        </button>
      </div>
    </div>
  );
};

export default ExpenseSummary;