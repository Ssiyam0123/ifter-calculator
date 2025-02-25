// MoneyActionModal.js
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure accessibility compliance

const MoneyActionModal = ({ isOpen, onRequestClose, modalAction, modalGroupId, modalValue, setModalValue, handleModalSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Money Action Modal"
      className="max-w-md mx-auto bg-white p-6 rounded shadow-lg mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-lg font-semibold mb-4">{modalAction}</h2>
      <p className="text-sm text-gray-600 mb-2">Group ID: {modalGroupId}</p>
      <input
        type="number"
        value={modalValue}
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
          onClick={onRequestClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full ml-2"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default MoneyActionModal;
