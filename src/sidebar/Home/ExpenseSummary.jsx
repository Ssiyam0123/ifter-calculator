import React, { useContext, useState } from "react";
import { CloudFog, Search } from "lucide-react";
import TransactionModal from "../../utils/TransactionModal";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import {
  isAfter,
  isSameDay,
  set,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from "date-fns";

const ExpenseSummary = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setIsModalState] = useState("trans");
  const [currentId, setCurrentId] = useState("");
  const [filter, setFilter] = useState("today");

  // Fetching transactions
  const { data: myData = [], refetch } = useQuery({
    queryKey: [`${user?.email}`],
    queryFn: async () => {
      const { data } = await axios.get(`https://idk-gray-two.vercel.app/mydata/${email}`);
      return Array.isArray(data) ? data : [];
    },
  });

  console.log(myData);

  const expenseData = myData.filter((i) => i.transactionType == "expense");
  const incomeData = myData.filter((i) => i.transactionType == "income");
  console.log(expenseData)
  console.log(incomeData)

  const handleUpdateModal = (id) => {
    console.log(id);
    setCurrentId(id);
    setIsModalOpen(true);
    setIsModalState("summ");
  };
  const addSummaryModal = () => {
    setIsModalOpen(true);
    setIsModalState("addsumm");
  };

  const today = new Date();
  const yesterday = subDays(today, 1);
  const weekStart = startOfWeek(today);
  const monthStart = startOfMonth(today);
  const yearStart = startOfYear(today);

  const filteredData = myData.filter((item) => {
    const itemDate = new Date(item.date);
    switch (filter) {
      case "Today":
        return isSameDay(itemDate, today);
      case "Yesterday":
        return isSameDay(itemDate, yesterday);
      case "This Week":
        return isAfter(itemDate, weekStart) || isSameDay(itemDate, weekStart);
      case "This Month":
        return isAfter(itemDate, monthStart) || isSameDay(itemDate, monthStart);
      case "This Year":
        return isAfter(itemDate, yearStart) || isSameDay(itemDate, yearStart);
      default:
        return true;
    }
  });

  const totalIncome = filteredData
    .filter((item) => item.transactionType === "income")
    .reduce((acc, item) => acc + (item.amount || 0), 0);

  const totalExpense = filteredData
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, item) => acc + (item.amount || 0), 0);

  const balance = totalIncome - totalExpense;

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
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>Yesterday</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="flex justify-between">
          <span>Today Earnings</span>
          <span className="text-green-600 font-semibold">${totalIncome}</span>
        </div>
        <div className="flex justify-between">
          <span>Today Expenses</span>
          <span className="text-red-500 font-semibold">${totalExpense}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Balance</span>
          <span className="text-blue-600 font-semibold">${balance}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Total Amount</span>
          <span className="text-purple-600 font-semibold">
            $beyond your expectation
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        <button className="w-1/2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium">
          Daily
        </button>
        <button className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 font-medium">
          Recurring
        </button>
      </div>

      {/* Expenses and Income Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expenses */}
        <div>
          <h3 className="font-semibold text-lg text-red-500">Expenses</h3>
          {expenseData?.length ? (
            expenseData.map((item) => (
              <div
                key={item._id}
                onClick={() => handleUpdateModal(item._id)}
                className="bg-white rounded-xl shadow p-4 flex gap-4 items-center mt-2"
              >
                <div className="bg-red-100 p-3 rounded-full">
                  <img alt="Expense" width={32} height={32} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.category}</p>
                  <p className="text-gray-500 text-sm">
                    {item.description || "No description"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-red-500 font-semibold">-${item.amount}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-2">No expenses found.</p>
          )}
        </div>

        {/* Income */}
        <div>
          <h3 className="font-semibold text-lg text-green-500">Income</h3>
          {incomeData?.length ? (
            incomeData.map((item) => (
              <div
                key={item._id}
                onClick={() => handleUpdateModal(item._id)}
                className="bg-white rounded-xl shadow p-4 flex gap-4 items-center mt-2"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <img
                    src="https://img.icons8.com/ios-filled/50/4CAF50/money.png"
                    alt="Income"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.category}</p>
                  <p className="text-gray-500 text-sm">
                    {item.description || "No description"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">
                    +${item.amount}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-2">
              No income records found.
            </p>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => addSummaryModal()}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          +
        </button>
      </div>
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalState={modalState}
          refetch={refetch}
          currentId={currentId}
        />
      )}
    </div>
  );
};

export default ExpenseSummary;
