import React, { useState } from 'react';
import { APP_USERS, OWNER_EMAIL } from '../data/usersData';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = APP_USERS[email];
    if (user) {
      onLogin(user);
    } else {
      setError('User not found. Try one of the test emails.');
    }
  };

  const handleTestLogin = () => {
    const ownerUser = APP_USERS[OWNER_EMAIL];
    onLogin(ownerUser);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Shopping List App</h1>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email (e.g., owner@test.com)"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        
        <div className="my-4 border-t border-gray-200"></div>

        <button
          onClick={handleTestLogin}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Test as Owner
        </button>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
          <p className="font-semibold">Test Accounts:</p>
          <p><strong>Owner:</strong> owner@test.com</p>
          <p><strong>Participants:</strong> participant1@test.com ... participant10@test.com</p>
        </div>
      </div>
    </div>
  );
}