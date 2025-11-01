import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
const buttonStyle = (active) => ({
marginRight: '0.5rem',
padding: '0.5rem 1rem',
borderRadius: '5px',
border: 'none',
cursor: 'pointer',
backgroundColor: active ? '#4CAF50' : '#f0f0f0',
color: active ? 'white' : 'black',
fontWeight: 'bold',
});

return (
<div style={{ margin: '10px 0' }}>
<button style={buttonStyle(filter === 'all')} onClick={() => setFilter('all')}>
Show All </button>
<button style={buttonStyle(filter === 'active')} onClick={() => setFilter('active')}>
Active Only </button> </div>
);
};

export default FilterBar;
