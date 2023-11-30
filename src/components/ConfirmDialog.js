import React from "react";
import Modal from "react-modal";
function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
  return (
    <Modal
      isOpen={isOpen}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 shadow-lg"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-900 flex items-center justify-center"
    >
      <div className="text-center">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationDialog;
