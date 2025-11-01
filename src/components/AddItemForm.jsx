import React, { useState } from 'react';

const AddItemForm = ({ addItem }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName) return;
    addItem(itemName);
    setItemName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;
