import React from 'react';
export default function ShoppingListTile({ list, currentUser, onSelect, onDelete }) {
  const isOwner = list.ownerId === currentUser.email;

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(list.id, list.name);
  };

  const handleSelect = () => {
    onSelect(list.id);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
      onClick={handleSelect}
    >
      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          {list.name}
        </h3>
        <p className={`text-sm ${isOwner ? 'text-green-600' : 'text-gray-500'}`}>
          {isOwner ? 'Owner: You' : 'Owner: Other'}
        </p>
        {list.isArchived && (
          <span className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Archived
          </span>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleSelect}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
        >
          Show
        </button>
        {isOwner && (
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}