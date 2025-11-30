import { initialLists } from '../data/shoppingListData';

const USE_MOCK = true; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockData = [...initialLists];

async function callServer(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.uuAppErrorMap?.message || 'Server error');
  }

  return response.json();
}

export const api = {
  getLists: async () => {
    if (USE_MOCK) {
      await sleep(500);
      return [...mockData];
    } else {
      const data = await callServer('/list/get'); 
      return data.dtoOut || data;
    }
  },

  createList: async (list) => {
    if (USE_MOCK) {
      await sleep(500);
      const newList = { ...list, id: Date.now().toString() };
      mockData = [newList, ...mockData];
      return newList;
    } else {
      return callServer('/list/create', 'POST', list);
    }
  },

  deleteList: async (id) => {
    if (USE_MOCK) {
      await sleep(500);
      mockData = mockData.filter(item => item.id !== id);
      return { success: true };
    } else {
      return callServer('/list/delete', 'POST', { id });
    }
  },

  getListDetail: async (id) => {
    if (USE_MOCK) {
      await sleep(500);
      const list = mockData.find(item => item.id === id);
      if (!list) throw new Error("List not found");
      return list;
    } else {
      return callServer('/list/get', 'POST', { id });
    }
  },

  updateList: async (updatedList) => {
    if (USE_MOCK) {
      await sleep(500);
      mockData = mockData.map(list => list.id === updatedList.id ? updatedList : list);
      return updatedList;
    } else {
      return callServer('/list/update', 'POST', updatedList);
    }
  }
};