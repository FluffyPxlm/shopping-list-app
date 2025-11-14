import React, { useState, useMemo } from 'react';
import ShoppingListTile from '../components/ShoppingListTile';
import CreateListModal from '../components/CreateListModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function ShoppingListView({ currentUser, onSelectList, lists, setLists }) {
  const [showArchived, setShowArchived] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredLists = useMemo(() => {
    return lists
      .filter((list) => showArchived || !list.isArchived)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [lists, showArchived]);

  const handleCreateList = (name) => {
    const newList = {
      id: Date.now().toString(),
      name: name,
      isArchived: false,
      ownerId: currentUser.email, 
      participants: [], 
      items: []
    };
    setLists([newList, ...lists]);
  };

  const handleDeleteRequest = (id, name) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setLists(lists.filter((list) => list.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Lists Overview</h1>

      <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">Show archived</span>
        </label>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create New List
        </button>
      </div>

      {filteredLists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLists.map((list) => (
            <ShoppingListTile
              key={list.id}
              list={list}
              currentUser={currentUser} 
              onSelect={onSelectList}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-xl">No lists to display.</p>
        </div>
      )}

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateList}
      />
      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        listName={deleteTarget?.name || ''}
      />
    </div>
  );
}