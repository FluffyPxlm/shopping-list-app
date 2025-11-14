import React, { useState, useEffect } from 'react';
import ShoppingItem from '../components/ShoppingItem';
import AddItemForm from '../components/AddItemForm';
import Participants from '../components/Participants';
import FilterBar from '../components/FilterBar';

const ShoppingListDetail = ({ currentUser, list, onBack, lists, setLists }) => {
  
  const [items, setItems] = useState(list.items);
  const [participants, setParticipants] = useState(list.participants);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setItems(list.items);
    setParticipants(list.participants);
  }, [list]);

  const isOwner = list.ownerId === currentUser.email;
  const isParticipant = list.participants.some(p => p.email === currentUser.email);
  const canView = isOwner || isParticipant;
  const canEditItems = isOwner || isParticipant;
  const canEditParticipants = isOwner; 

  const addItem = (name) => {
    const newItem = { id: Date.now(), name, done: false };
    const updated = [...items, newItem];
    setItems(updated);
    updateList({ items: updated });
  };

  const deleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    updateList({ items: updated });
  };

  const toggleDone = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setItems(updated);
    updateList({ items: updated });
  };

  const addParticipant = (name, email) => { 
    if (!name || !email) return;
    const updated = [...participants, { id: Date.now(), name, email }];
    setParticipants(updated);
    updateList({ participants: updated });
  };

  const removeParticipant = (id) => {
    const updated = participants.filter(p => p.id !== id);
    setParticipants(updated);
    updateList({ participants: updated });
  };

  const updateList = (changes) => {
    const updatedLists = lists.map(l => {
      if (l.id === list.id) {
        return { ...l, ...changes };
      }
      return l;
    });
    setLists(updatedLists);
  };

  const filteredItems = items.filter(item => {
    if (filter === 'active') return !item.done;
    return true;
  });

  if (!list) {
    return (
      <div className="p-8">
        <button onClick={onBack} className="...">&larr; Back</button>
        <p>List not found.</p>
      </div>
    );
  }

  if (!canView) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          &larr; Back to Overview
        </button>
        <h1 className="text-2xl font-bold mb-4">{list.name}</h1>
        <p className="text-xl text-red-600 bg-red-100 p-4 rounded-lg">
          You do not have permission to view this list.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
      >
        &larr; Back to Overview
      </button>

      <h1>{list.name}</h1>
      
      {isOwner ? (
        <>
          <h3>Participants</h3>
          <Participants 
            participants={participants} 
            addParticipant={addParticipant} 
            removeParticipant={removeParticipant} 
            canEditParticipants={canEditParticipants} 
          />
        </>
      ) : (
        <>
          <h3>Participants</h3>
          <p className="text-gray-600 text-sm">
            {participants.map(p => p.name).join(', ')}
          </p>
          <p className="text-gray-500 text-xs italic mt-2">Only the owner can manage participants.</p>
        </>
      )}

      <h3>Shopping Items</h3>
      {canEditItems ? (
        <>
          <AddItemForm addItem={addItem} />
          <FilterBar filter={filter} setFilter={setFilter} />
          {filteredItems.map(item => (
            <ShoppingItem
              key={item.id}
              item={item}
              deleteItem={isOwner ? deleteItem : null} 
              toggleDone={toggleDone} 
            />
          ))}
        </>
      ) : (
        <p>You cannot edit items for this list.</p> 
      )}
    </div>
  );
};

export default ShoppingListDetail;