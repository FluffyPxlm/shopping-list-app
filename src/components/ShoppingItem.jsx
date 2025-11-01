import React from 'react';

const ShoppingItem = ({ item, deleteItem, toggleDone }) => {
return (
<div style={{
display: 'flex',
alignItems: 'center',
padding: '5px 10px',
marginBottom: '5px',
borderRadius: '5px',
backgroundColor: '#f9f9f9',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
}}>
<input
type="checkbox"
checked={item.done}
onChange={() => toggleDone(item.id)}
style={{ marginRight: '10px', transform: 'scale(1.2)' }}
/>
<span style={{
flexGrow: 1,
textDecoration: item.done ? 'line-through' : 'none',
color: item.done ? '#888' : '#000',
fontSize: '1rem'
}}>
{item.name} </span>
<button
onClick={() => deleteItem(item.id)}
style={{
backgroundColor: '#e74c3c',
color: 'white',
border: 'none',
borderRadius: '5px',
padding: '5px 10px',
cursor: 'pointer'
}}
>
Delete </button> </div>
);
};

export default ShoppingItem;
