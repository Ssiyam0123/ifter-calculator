import React, { useContext, useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import TransactionModal from "../../utils/TransactionModal";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { format, subDays, startOfWeek, startOfMonth, startOfYear, isAfter, isSameDay } from "date-fns";
import Card from "../../components/Card";

const ExpenseSummary = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("trans");
  const [currentId, setCurrentId] = useState("");
  const [filter, setFilter] = useState("Today");

  const { data: myData = [], refetch } = useQuery({
    queryKey: [`transactions-${email}`],
    queryFn: async () => {
      const { data } = await axios.get(`https://idk-gray-two.vercel.app/mydata/${email}`);
      return Array.isArray(data) ? data : [];
    },
  });

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

  const handleUpdateModal = (id) => {
    setCurrentId(id);
    setIsModalOpen(true);
    setModalState("edit");
  };

  const addSummaryModal = () => {
    setIsModalOpen(true);
    setModalState("add");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Income" value={`$${totalIncome}`} color="green" />
        <Card title="Total Expenses" value={`$${totalExpense}`} color="red" />
        <Card title="Balance" value={`$${balance}`} color="blue" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-lg text-red-500">Expenses</h3>
          {filteredData.filter((item) => item.transactionType === "expense").map((item) => (
            <Card
              key={item._id}
              title={item.category}
              description={item.description}
              value={`-$${item.amount}`}
              color="red"
              onClick={() => handleUpdateModal(item._id)}
            />
          ))}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-green-500">Income</h3>
          {filteredData.filter((item) => item.transactionType === "income").map((item) => (
            <Card
              key={item._id}
              title={item.category}
              description={item.description}
              value={`+$${item.amount}`}
              color="green"
              onClick={() => handleUpdateModal(item._id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={addSummaryModal}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          <PlusCircle size={24} />
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
