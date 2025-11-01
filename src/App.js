import React, { useState } from 'react';
import ShoppingListDetail from './pages/ShoppingListDetail';

const initialShoppingLists = [
{
id: 1,
name: 'Weekly Groceries',
participants: [
{ id: 1, name: 'Alice' },
{ id: 2, name: 'Bob' }
],
items: [
{ id: 1, name: 'Milk', done: false },
{ id: 2, name: 'Eggs', done: true },
{ id: 3, name: 'Bread', done: false }
]
},
{
id: 2,
name: 'Party Supplies',
participants: [
{ id: 3, name: 'Charlie' }
],
items: [
{ id: 4, name: 'Soda', done: false },
{ id: 5, name: 'Chips', done: false }
]
}
];

function App() {
const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);


const selectedList = shoppingLists[0];

return (
<div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}> <h1>My Shopping App</h1> <ShoppingListDetail
     list={selectedList}
     lists={shoppingLists}
     setLists={setShoppingLists}
   /> </div>
);
}

export default App;
