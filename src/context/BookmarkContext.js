import { createContext, useCallback, useReducer } from 'react';

/**
 * Bookmark Context
 */
export const BookmarkContext = createContext({});

// Load bookmarks from localstorage
const initialState = {
  bookmarks: localStorage.getItem('bookmarks')
    ? JSON.parse(localStorage.getItem('bookmarks'))
    : [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      const moreBookmarks = [...state.bookmarks, action.payload];
      // Update bookmark persistence
      localStorage.setItem('bookmarks', JSON.stringify(moreBookmarks));
      return {
        ...state,
        bookmarks: moreBookmarks,
      };
    case 'REMOVE_BOOKMARK':
      const fewerBookmarks = state.bookmarks.filter(
        (recipe) => recipe.id !== action.payload
      );
      // Update bookmark persistence
      localStorage.setItem('bookmarks', fewerBookmarks);
      return {
        ...state,
        bookmarks: fewerBookmarks,
      };
    default:
      return state;
  }
};

export const BookmarkContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBookmark = useCallback((recipe) => {
    dispatch({
      type: 'ADD_BOOKMARK',
      payload: recipe,
    });
  }, []);

  const removeBookmark = useCallback((id) => {
    dispatch({
      type: 'REMOVE_BOOKMARK',
      payload: id,
    });
  }, []);

  return (
    <BookmarkContext.Provider value={{ ...state, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
