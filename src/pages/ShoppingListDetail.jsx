import React, { useState } from 'react';
import ShoppingItem from '../components/ShoppingItem';
import AddItemForm from '../components/AddItemForm';
import Participants from '../components/Participants';
import FilterBar from '../components/FilterBar';

const ShoppingListDetail = ({ list, setLists, lists }) => {
const [items, setItems] = useState(list.items);
const [participants, setParticipants] = useState(list.participants);
const [filter, setFilter] = useState('all'); // all | active

// Add a new item
const addItem = (name) => {
const newItem = { id: Date.now(), name, done: false };
const updated = [...items, newItem];
setItems(updated);
updateList({ items: updated });
};

// Delete an item
const deleteItem = (id) => {
const updated = items.filter(item => item.id !== id);
setItems(updated);
updateList({ items: updated });
};

// Toggle item as done / not done
const toggleDone = (id) => {
const updated = items.map(item =>
item.id === id ? { ...item, done: !item.done } : item
);
setItems(updated);
updateList({ items: updated });
};

// Add a participant
const addParticipant = (name) => {
if (!name) return;
const updated = [...participants, { id: Date.now(), name }];
setParticipants(updated);
updateList({ participants: updated });
};

// Remove a participant
const removeParticipant = (id) => {
const updated = participants.filter(p => p.id !== id);
setParticipants(updated);
updateList({ participants: updated });
};

// Update the list in parent state
const updateList = (changes) => {
const updatedLists = lists.map(l => {
if (l.id === list.id) {
return { ...l, ...changes };
}
return l;
});
setLists(updatedLists);
};

// Filter items
const filteredItems = items.filter(item => {
if (filter === 'active') return !item.done;
return true;
});

return (
<div style={{ marginTop: '10px' }}> <h3>Participants</h3> <Participants 
     participants={participants} 
     addParticipant={addParticipant} 
     removeParticipant={removeParticipant} 
   />

  <h3>Shopping Items</h3>
  <AddItemForm addItem={addItem} />
  
  <FilterBar filter={filter} setFilter={setFilter} />

  {filteredItems.map(item => (
    <ShoppingItem
      key={item.id}
      item={item}
      deleteItem={deleteItem}
      toggleDone={toggleDone}
    />
  ))}
</div>

);
};

export default ShoppingListDetail;
