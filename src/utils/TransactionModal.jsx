import { useContext, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Popover } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function TransactionModal({
  isOpen,
  onClose,
  modalState,
  refetch,
  currentId
}) {
  const { user } = useContext(AuthContext);
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
//   console.log(modalState);
//   console.log(currentId)

  const handleSubmit = async () => {
    const data = {
      transactionType,
      category,
      date,
      amount: parseFloat(amount),
      note,
      email: user?.email,
    };
    console.log(data);
    const res = await axios.post(`http://localhost:5000/dailyBasisExOrIn`, {
      data,
    });
    console.log(res.data);
    if (res.data.acknowledged) {
      setCategory(""), setAmount(0), setNote("");
      //    console.log('data uploaded')
    }
    refetch();
    if (onClose) {
      onClose();
    }
  };


  const { data: currentData = [], } = useQuery({
    queryKey: [`${user?.email}`],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/getData/${currentId}`);
      return data;
    },
  });
  console.log(currentData)

  const thatDate = currentData?.date

  const handleDelete = async (id) =>{
    const res = await axios.delete(`http://localhost:5000/delete/${id}`);
    console.log(res.data);
    refetch()
    if (onClose) {
        onClose();
      }
    
  }



  if (modalState == "addsumm") {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4">New Transaction</h2>
              <button
                onClick={()=>handleModalClose()}
                className="text-lg font-semibold mb-4"
              >
                Close
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 p-2 rounded ${
                  transactionType === "expense"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setTransactionType("expense")}
              >
                Expense
              </button>
              <button
                className={`flex-1 p-2 rounded ${
                  transactionType === "income"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
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
            <button
              onClick={handleSubmit}
              className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={amount <= 0}
            >
              Add {transactionType}
            </button>
          </div>
        </div>
      </Dialog>
    );
  }

  else{
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
                <button
                  onClick={handleModalClose}
                  className="text-lg font-semibold mb-4"
                >
                  Close
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className={`flex-1 p-2 rounded ${
                    transactionType === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTransactionType("expense")}
                >
                  Expense
                </button>
                <button
                  className={`flex-1 p-2 rounded ${
                    transactionType === "income"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
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
                  defaultValue={currentData.category}
                //   value={category}
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
    
              <div className="mb-4">
                <input
                  type="number"
                //   value={amount}
                  defaultValue={currentData?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                //   value={note}
                  defaultValue={currentData?.note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                disabled={amount <= 0}
              >
                Update {transactionType}
              </button>
              <button onClick={()=>handleDelete(currentData?._id)} className="w-full p-2 bg-red-500 text-white rounded disabled:opacity-50">
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      );
  }
}
