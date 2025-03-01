import React, { useContext, useState } from "react";
import { CloudFog, Search } from "lucide-react";
import TransactionModal from "../../utils/TransactionModal";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { set } from "date-fns";

const ExpenseSummary = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setIsModalState] = useState('trans')

  // Fetching transactions
  const { data: myData = [], refetch } = useQuery({
    queryKey: [`${user?.email}`],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/mydata/${email}`);
      return data;
    },
  });

  // Filter expenses and income
  const expenses = myData.filter((item) => item.transactionType === "expense");
  const income = myData.filter((item) => item.transactionType === "income");

  const totalExpense = myData
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, item) => acc + item.amount, 0);
  const totalIncome = myData
    .filter((item) => item.transactionType === "income")
    .reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpense;
  console.log(balance)
  console.log(myData)
  const handleUpdateModal = (id)=>{
    console.log(id)
    setIsModalOpen(true)
    setIsModalState('summ')
  }
  const addSummaryModal = () =>{
    setIsModalOpen(true)
    setIsModalState('addsumm')
  }

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
        <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none">
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
          {expenses.length > 0 ? (
            expenses.map((item) => (
              <div 
                key={item._id}
                onClick={()=>handleUpdateModal(item._id)}
                className="bg-white rounded-xl shadow p-4 flex gap-4 items-center mt-2"
              >
                <div className="bg-red-100 p-3 rounded-full">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ff6b6b/expenses.png"
                    alt="Expense"
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
          {income.length > 0 ? (
            income.map((item) => (
              <div
                key={item._id}
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
        />
      )}
    </div>
  );
};

export default ExpenseSummary;
