import React, { useState } from 'react';
import { initialLists } from './data/shoppingListData';
import ShoppingListView from './pages/ShoppingListView';
import ShoppingListDetailView from './pages/ShoppingListDetail.jsx'; 
import LoginScreen from './components/LoginScreen'; 

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [currentView, setCurrentView] = useState('list'); 
  const [selectedListId, setSelectedListId] = useState(null);
  const [lists, setLists] = useState(initialLists);

  const handleLogin = (user) => {
    setCurrentUser(user); 
    setCurrentView('list'); 
    setSelectedListId(null);
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

  const selectedList = lists.find(list => list.id === selectedListId);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Shopping App</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm text-gray-600">{currentUser.email} ({currentUser.role})</p>
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
          lists={lists}
          setLists={setLists}
        />
      )}
      {currentView === 'detail' && (
        <ShoppingListDetailView
          currentUser={currentUser} 
          list={selectedList} 
          onBack={handleBackToList}
          lists={lists}
          setLists={setLists}
        />
      )}
    </div>
  );
}