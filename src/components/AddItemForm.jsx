import React, { useState } from 'react';

const AddItemForm = ({ addItem }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return; 
    addItem(itemName);
    setItemName('');
  };

  return (
    
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4"> 
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
       
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        disabled={!itemName.trim()} 
      >
        Add
      </button>
    </form>
  );
};

export default AddItemForm;