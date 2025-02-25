import React, { useState } from 'react';
import { Pencil, PlusCircle, DollarSign, Trash2 } from 'lucide-react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility compliance

const GroupTable = ({ groups }) => {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalValue, setModalValue] = useState('');
  const [modalGroupId, setModalGroupId] = useState(null);
  const [modalMemberIndex, setModalMemberIndex] = useState(null);

  const openModal = (action, groupId, memberIndex) => {
    setModalAction(action);
    setModalGroupId(groupId);
    setModalMemberIndex(memberIndex);
    setModalValue('');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalAction(null);
    setModalGroupId(null);
    setModalMemberIndex(null);
  };

  const handleModalSubmit = () => {
    const value = parseFloat(modalValue);
    if (isNaN(value) || !modalGroupId || modalMemberIndex === null) return;

    const updatedGroups = groups.map((group) => {
      if (group._id === modalGroupId) {
        const updatedMembers = group.members.map((member, index) => {
          if (index === modalMemberIndex) {
            let newAmount = parseFloat(member.amount);
            if (modalAction === 'Add Money') newAmount += value;
            if (modalAction === 'Deposit Money') newAmount = Math.max(newAmount - value, 0);
            return { ...member, amount: newAmount.toString() };
          }
          return member;
        });
        return { ...group, members: updatedMembers };
      }
      return group;
    });

    console.log('Updated Groups:', updatedGroups); // Replace with state update logic
    closeModal();
  };

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Group Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Members Count</th>
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
                  className={`w-full px-2 py-1 rounded ${editingGroupId === group._id ? 'border border-blue-500' : 'border-transparent'}`}
                />
                <button onClick={() => setEditingGroupId(group._id)} className="text-blue-500 hover:text-blue-700" title="Edit Group Name">
                  <Pencil size={18} />
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">{group.membersCount}</td>
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
                            defaultValue={member.name}
                            readOnly
                            className="px-2 py-1 rounded w-full border border-transparent"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="number"
                            value={member.amount}
                            readOnly
                            className="px-2 py-1 rounded w-full border border-gray-300 text-center"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1 flex justify-center gap-2">
                          <button
                            onClick={() => openModal('Add Money', group._id, index)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Add Money"
                          >
                            <PlusCircle size={18} />
                          </button>
                          <button
                            onClick={() => openModal('Deposit Money', group._id, index)}
                            className="text-yellow-500 hover:text-yellow-700"
                            title="Deposit Money"
                          >
                            <DollarSign size={18} />
                          </button>
                          <button
                            onClick={() => console.log('Delete member')}
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
        <input
          type="number"
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
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
