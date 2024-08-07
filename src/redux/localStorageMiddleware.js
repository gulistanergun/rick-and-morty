export const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
  
    if (action.type === "favorites/addFavorite" || action.type === "favorites/removeFavorite") {
      const state = store.getState();
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  
    return result;
  };
  
