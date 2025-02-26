import React, { useState } from "react";
import { Pencil, PlusCircle, DollarSign, Trash2 } from "lucide-react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const GroupTable = ({ groups, refetch }) => {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null); // Track editing state for members' names
  const [editedMemberName, setEditedMemberName] = useState(""); // Store the new name for editing
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalValue, setModalValue] = useState(0);
  const [modalGroupId, setModalGroupId] = useState(null);
  const [modalMemberId, setModalMemberIndex] = useState(null);
  const [currentStatus,setCurrentStatus]= useState('')

  const openModal = (action, groupId, memberId, status) => {
    console.log("Opening modal for group ID:", groupId);
    setModalAction(action);
    setModalGroupId(groupId);
    setModalMemberIndex(memberId);
    setCurrentStatus(status)
    console.log(memberId)

    const memberAmount = groups.find((group) => group._id === groupId)?.members[memberId]?.amount;
    setModalValue(Number(memberAmount) || 0);

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalAction(null);
    setModalGroupId(null);
    setModalMemberIndex(null);
  };

  const handleModalSubmit =async () => {
    console.log("Submitting modal for group ID:", modalGroupId);

    if (!modalGroupId || modalMemberId === null) return;

    const updatedGroups = groups?.map((group) => {
      if (group._id === modalGroupId) {
        const updatedMembers = group.members.map((member) => {
          if (member.id === modalMemberId) {
            let newAmount = Number(member.amount);
            if (modalAction === "Add Money") newAmount += modalValue;
            if (modalAction === "Deposit Money") newAmount = Math.max(newAmount - modalValue, 0);
            return { ...member, amount: newAmount };
          }
          return member;
        });
        return { ...group, members: updatedMembers };
      }
      return group;
    });

    // console.log("Updated Groups:", updatedGroups);
    // console.log(modalValue)

    const res = await axios.patch(`http://localhost:5000/update/${modalGroupId}/userId/${modalMemberId}/?sort=${currentStatus}`,
      {
        amount: modalValue
      }
    )

    console.log(res.data)
    refetch()


    closeModal();
  };

  const handleMemberNameChange = (index, newName) => {
    // Update the member's name in the group when the user finishes editing
    const updatedGroups = groups?.map((group) => {
      if (group._id === modalGroupId) {
        const updatedMembers = group.members.map((member, idx) => {
          if (idx === index) {
            return { ...member, name: newName };
          }
          return member;
        });
        return { ...group, members: updatedMembers };
      }
      return group;
    });

    console.log("Updated Groups with new member name:", updatedGroups);
  };

  const handleDelete = async (userid,groupId) =>{
    const res = await axios.delete(`http://localhost:5000/group/${groupId}/members/${userid}`)
    console.log(res.data)
    refetch()
  }

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Group Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Members</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                <input
                  type="text"
                  defaultValue={group.groupName}
                  readOnly={editingGroupId !== group._id}
                  className={`w-full px-2 py-1 rounded ${
                    editingGroupId === group._id ? "border border-blue-500" : "border-transparent"
                  }`}
                  onBlur={() => setEditingGroupId(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditingGroupId(null);
                      console.log("Updated group name for ID:", group._id, "New name:", e.target.value);
                    }
                  }}
                />
                <button
                  onClick={() => setEditingGroupId(group._id)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Group Name"
                >
                  <Pencil size={18} />
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-left">#</th>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-left">Name</th>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-center">Amount</th>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((member, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-200 px-2 py-1">{index + 1}</td>
                        <td className="border border-gray-200 px-2 py-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editingMemberId === index ? editedMemberName : member.name}
                            readOnly={editingMemberId !== index}
                            onChange={(e) => {
                              if (editingMemberId === index) {
                                setEditedMemberName(e.target.value);
                              }
                            }}
                            className="px-2 py-1 rounded w-full border border-transparent"
                          />
                          <button
                            onClick={() => {
                              if (editingMemberId === index) {
                                handleMemberNameChange(index, editedMemberName);
                                setEditingMemberId(null); // Stop editing after submitting
                              } else {
                                setEditingMemberId(index);
                                setEditedMemberName(member.name); // Set initial name when editing starts
                              }
                            }}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit Member Name"
                          >
                            <Pencil size={16} />
                          </button>
                        </td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="number"
                            value={Number(member.amount)}
                            readOnly
                            className="px-2 py-1 rounded w-full border border-gray-300 text-center"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1 flex justify-center gap-2">
                          <button
                            onClick={() => openModal("Add Money", group._id, member.id,'inc')}
                            className="text-blue-500 hover:text-blue-700"
                            title="Add Money"
                          >
                            <PlusCircle size={18} />
                          </button>
                          <button
                            onClick={() => openModal("Deposit Money", group._id, member.id,'dec')}
                            className="text-yellow-500 hover:text-yellow-700"
                            title="Deposit Money"
                          >
                            <DollarSign size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id,group._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Member"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Money Action Modal"
        className="max-w-md mx-auto bg-white p-6 rounded shadow-lg mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">{modalAction}</h2>
        <p className="text-sm text-gray-600 mb-2">Group ID: {modalGroupId}</p>
        <input
          type="number"
          min={1}
          onChange={(e) => setModalValue(Number(e.target.value))}
          placeholder="Enter amount"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={handleModalSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mr-2"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full ml-2"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GroupTable;
