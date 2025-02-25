import React, { useState } from 'react';
import { Pencil, PlusCircle, DollarSign, Trash2 } from 'lucide-react';

const GroupTable = ({ groups }) => {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingMemberIndex, setEditingMemberIndex] = useState(null);

  const handleEditGroupName = (groupId) => {
    setEditingGroupId(groupId);
  };

  const handleEditMember = (groupId, memberIndex) => {
    setEditingGroupId(groupId);
    setEditingMemberIndex(memberIndex);
  };

  const handleAction = (action, groupId, memberIndex = null) => {
    console.log(`${action} action for group ${groupId}${memberIndex !== null ? `, member ${memberIndex}` : ''}`);
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
                <button onClick={() => handleEditGroupName(group._id)} className="text-blue-500 hover:text-blue-700">
                  <Pencil size={18} />
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">{group.membersCount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-left">Name</th>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-center">Amount</th>
                      <th className="border border-gray-200 px-2 py-1 text-sm text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(group.members) && group.members.flat().map((member, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-200 px-2 py-1 flex items-center gap-2">
                          <input
                            type="text"
                            defaultValue={member.name}
                            readOnly={!(editingGroupId === group._id && editingMemberIndex === index)}
                            className={`w-full px-2 py-1 rounded ${editingGroupId === group._id && editingMemberIndex === index ? 'border border-green-500' : 'border-transparent'}`}
                          />
                          <button onClick={() => handleEditMember(group._id, index)} className="text-green-500 hover:text-green-700">
                            <Pencil size={16} />
                          </button>
                        </td>
                        <td className="border border-gray-200 px-2 py-1">${member.amount}</td>
                        <td className="border border-gray-200 px-2 py-1">
                          <button onClick={() => handleAction('Add Money', group._id, index)} className="text-blue-500 hover:text-blue-700" title="Add Money">
                            <PlusCircle size={18} />
                          </button>
                          <button onClick={() => handleAction('Deposit Money', group._id, index)} className="text-yellow-500 hover:text-yellow-700" title="Deposit Money">
                            <DollarSign size={18} />
                          </button>
                          <button onClick={() => handleAction('Delete Member', group._id, index)} className="text-red-500 hover:text-red-700" title="Delete Member">
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
    </div>
  );
};

export default GroupTable;
