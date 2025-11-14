import React, { useState } from 'react';

export default function CreateListModal({ isOpen, onClose, onSubmit }) {
  const [listName, setListName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onSubmit(listName.trim());
      setListName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Shopping list name..."
            className="w-full px-4 py-2 border rounded-lg mb-4"
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!listName.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}