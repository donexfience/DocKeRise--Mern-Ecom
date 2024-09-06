import React from 'react';

const ConfirmModal = ({ title, positiveAction, negativeAction }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
      <div className="bg-white w-96 rounded-lg p-8 animate__animated animate__bounceIn">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
            onClick={negativeAction}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            onClick={positiveAction}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
