import React, { useState, useEffect, useCallback } from 'react';
import ShoppingItem from '../components/ShoppingItem';
import AddItemForm from '../components/AddItemForm';
import Participants from '../components/Participants';
import FilterBar from '../components/FilterBar';
import { api } from '../utils/api';

export default function ShoppingListDetail({ currentUser, listId, onBack }) {

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filter, setFilter] = useState('all');

  const loadListDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getListDetail(listId);
      setList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [listId]);

  useEffect(() => {
    loadListDetail();
  }, [loadListDetail]);
  const handleUpdateList = async (updatedListData) => {
    try {
      setList(updatedListData);
      await api.updateList(updatedListData);
    } catch (err) {
      setError("Failed to save changes: " + err.message);
      loadListDetail();
    }
  };

  
  if (loading) return <div className="p-10 text-center">Loading list details...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error: {error} <button onClick={onBack}>Back</button></div>;
  if (!list) return null;

  const isOwner = list.ownerId === currentUser.email;
  const isParticipant = list.participants.some(p => p.email === currentUser.email);
  const canView = isOwner || isParticipant;
  const canEditItems = isOwner || isParticipant;
  const canEditParticipants = isOwner;

  if (!canView) {
    return (
      <div className="p-8 text-center">
         <h1 className="text-red-600 text-xl">Access Denied</h1>
         <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-200 rounded">Back</button>
      </div>
    );
  }


  const addItem = (name) => {
    const newItem = { id: Date.now().toString(), name, done: false };
    const updatedList = { ...list, items: [...list.items, newItem] };
    handleUpdateList(updatedList);
  };

  const deleteItem = (itemId) => {
    const updatedList = { ...list, items: list.items.filter(i => i.id !== itemId) };
    handleUpdateList(updatedList);
  };

  const toggleDone = (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.map(i => i.id === itemId ? { ...i, done: !i.done } : i)
    };
    handleUpdateList(updatedList);
  };

  const addParticipant = (name, email) => {
    const newParticipant = { id: Date.now().toString(), name, email };
    const updatedList = { ...list, participants: [...list.participants, newParticipant] };
    handleUpdateList(updatedList);
  };

  const removeParticipant = (participantId) => {
    const updatedList = { ...list, participants: list.participants.filter(p => p.id !== participantId) };
    handleUpdateList(updatedList);
  };

  const filteredItems = list.items.filter(item => {
    if (filter === 'active') return !item.done;
    return true;
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
      >
        &larr; Back to Overview
      </button>

      <h1 className="text-2xl font-bold mb-4">{list.name}</h1>

      {isOwner ? (
        <>
          <h3 className="font-semibold mt-4">Participants</h3>
          <Participants 
            participants={list.participants} 
            addParticipant={addParticipant} 
            removeParticipant={removeParticipant} 
            canEditParticipants={canEditParticipants} 
          />
        </>
      ) : (
        <div className="mb-4">
          <h3 className="font-semibold">Participants</h3>
          <p className="text-sm text-gray-600">{list.participants.map(p => p.name).join(', ')}</p>
        </div>
      )}

      <h3 className="font-semibold mt-6 mb-2">Shopping Items</h3>
      {canEditItems && (
        <>
          <AddItemForm addItem={addItem} />
          <FilterBar filter={filter} setFilter={setFilter} />
        </>
      )}

      <div className="mt-4">
        {filteredItems.map(item => (
          <ShoppingItem
            key={item.id}
            item={item}
            deleteItem={isOwner ? deleteItem : null}
            toggleDone={toggleDone}
          />
        ))}
        {filteredItems.length === 0 && <p className="text-gray-500 italic">No items found.</p>}
      </div>
    </div>
  );
}