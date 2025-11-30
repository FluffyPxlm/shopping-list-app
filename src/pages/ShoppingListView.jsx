import React, { useState, useEffect, useMemo } from 'react';
import ShoppingListTile from '../components/ShoppingListTile';
import CreateListModal from '../components/CreateListModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { api } from '../utils/api';

export default function ShoppingListView({ currentUser, onSelectList }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  const [showArchived, setShowArchived] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      setLoading(true);
      const data = await api.getLists();
      setLists(data);
      setError(null); 
    } catch (err) {
      setError("Failed to load lists: " + err.message);
    } finally {
      setLoading(false); 
    }
  };
  const filteredLists = useMemo(() => {
    return lists
      .filter((list) => showArchived || !list.isArchived)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [lists, showArchived]);
  const handleCreateList = async (name) => {
    try {
      const newList = {
        name: name,
        isArchived: false,
        ownerId: currentUser.email,
        participants: [],
        items: []
      };
      const createdList = await api.createList(newList);
      setLists([createdList, ...lists]);
    } catch (err) {
      alert("Error creating list: " + err.message);
    }
  };

  const handleDeleteRequest = (id, name) => setDeleteTarget({ id, name });

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      try {
        await api.deleteList(deleteTarget.id);
        setLists(lists.filter((list) => list.id !== deleteTarget.id));
        setDeleteTarget(null);
      } catch (err) {
        alert("Error deleting list: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button onClick={loadLists} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
      </div>
    );
  }

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