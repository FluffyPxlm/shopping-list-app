export const initialLists = [
  { 
    id: "list-1",
    name: 'Weekly Groceries', 
    isArchived: false, 
    ownerId: "owner@test.com",
    participants: [
      { id: 1, name: 'Alice', email: "participant1@test.com" },
      { id: 2, name: 'Bob', email: "participant2@test.com" }
    ],
    items: [
      { id: 1, name: 'Milk', done: false },
      { id: 2, name: 'Eggs', done: true },
      { id: 3, name: 'Bread', done: false }
    ]
  },
  { 
    id: "list-2", 
    name: "Party supplies", 
    isArchived: false, 
    ownerId: "participant1@test.com",
    participants: [{ id: 3, name: 'Charlie', email: "participant3@test.com" }],
    items: [{ id: 4, name: 'Soda', done: false }]
  },
  { 
    id: "list-3", 
    name: "Old shopping list", 
    isArchived: true, 
    ownerId: "owner@test.com",
    participants: [],
    items: []
  },
];