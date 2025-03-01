import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Popover } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function TransactionModal({ isOpen, onClose }) {
  const [transactionType, setTransactionType] = useState("expense");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const handleModalClose = () => {
    console.log("Closing modal...");
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">New Transaction</h2>
            <button onClick={handleModalClose} className="text-lg font-semibold mb-4">
              Close
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <button
              className={`flex-1 p-2 rounded ${
                transactionType === "expense" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setTransactionType("expense")}
            >
              Expense
            </button>
            <button
              className={`flex-1 p-2 rounded ${
                transactionType === "income" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setTransactionType("income")}
            >
              Income
            </button>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Search category..."
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium">Transaction Date</label>
            <Popover>
              <button className="w-full flex justify-between items-center p-2 border rounded mt-1">
                {format(date, "dd/MM/yyyy")}
                <CalendarIcon className="w-4 h-4" />
              </button>
            </Popover>
          </div>
          <div className="mb-4 text-center text-2xl font-semibold">{amount}</div>
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full p-2 border rounded"
            />
          </div>
          <button className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50" disabled={amount <= 0}>
            Add {transactionType}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
