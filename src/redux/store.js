import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

// localStorage'dan favori karakterleri yükle
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const preloadedState = {
  favorites: loadState() || [],
};

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
