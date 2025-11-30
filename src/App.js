import React, { useState } from 'react';
import ShoppingListView from './pages/ShoppingListView';
import ShoppingListDetailView from './pages/ShoppingListDetail.jsx'; 
import LoginScreen from './components/LoginScreen';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('list');
  const [selectedListId, setSelectedListId] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('list');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('list');
    setSelectedListId(null);
  };

  const handleSelectList = (listId) => {
    setSelectedListId(listId);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedListId(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white p-4 shadow-md mb-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Shopping App</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      
      {currentView === 'list' && (
        <ShoppingListView
          currentUser={currentUser}
          onSelectList={handleSelectList}
        />
      )}
      {currentView === 'detail' && (
        <ShoppingListDetailView
          currentUser={currentUser}
          listId={selectedListId}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}