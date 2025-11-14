import React, { useState } from 'react';
import { APP_USERS } from '../data/usersData'; 

const Participants = ({ participants, addParticipant, removeParticipant, canEditParticipants }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const userToAdd = APP_USERS[email];
    
    if (!userToAdd) {
      setError("User not found in the system.");
      return;
    }

    if (participants.some(p => p.email === email)) {
      setError("User is already a participant.");
      return;
    }
 
    addParticipant(userToAdd.name, userToAdd.email);
    setEmail('');
    setError('');
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        {participants.map(p => (
          <div 
            key={p.id} 
            className="flex justify-between items-center bg-gray-50 p-2 rounded-md mb-2"
          >
            <div>
              <span className="text-gray-800 font-semibold">{p.name}</span>
              <span className="text-gray-600 text-sm ml-2">({p.email})</span>
            </div>
            {canEditParticipants && (
              <button
                onClick={() => removeParticipant(p.id)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {participants.length === 0 && (
          <p className="text-gray-500 text-sm">No participants added yet.</p>
        )}
      </div>

      {canEditParticipants && (
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Add Participant by email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setError('');
              }}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Participants;