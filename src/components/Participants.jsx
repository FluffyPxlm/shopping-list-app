import React, { useState } from 'react';

const Participants = ({ participants, addParticipant, removeParticipant }) => {
  const [name, setName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    addParticipant(name);
    setName('');
  };

  return (
    <div>
      {participants.map(p => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
          <span>{p.name}</span>
          <button onClick={() => removeParticipant(p.id)}>Remove</button>
        </div>
      ))}
      <form onSubmit={handleAdd} style={{ marginTop: '5px' }}>
        <input
          type="text"
          placeholder="Add Participant"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Participants;
