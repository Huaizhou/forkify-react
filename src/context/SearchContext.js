import { API_URL, API_KEY, RES_PER_PAGE } from '../utils/config';
import { AJAX } from '../utils/helper';
import { createContext, useCallback, useReducer } from 'react';

/**
 * Search Context
 */
export const SearchContext = createContext({});

const initialState = {
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  loading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SEARCH_RESULTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LOAD_SEARCH_RESULTS_SUCCESS':
      return {
        ...state,
        search: {
          ...state.search,
          ...action.payload,
        },
        loading: false,
      };
    case 'LOAD_SEARCH_RESULTS_ERROR':
      return {
        ...state,
        search: {},
        loading: true,
        error: action.payload,
      };
    case 'SET_PAGE':
      return {
        ...state,
        search: {
          ...state.search,
          page: action.payload,
        },
      };
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadSearchResults = useCallback(async (query) => {
    // Render spinner
    dispatch({ type: 'LOAD_SEARCH_RESULTS_REQUEST' });

    try {
      const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
      const results = data.data.recipes.map((rec) => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
        };
      });

      if (results) {
        dispatch({
          type: 'LOAD_SEARCH_RESULTS_SUCCESS',
          payload: {
            query,
            results,
            page: 1,
          },
        });
      }
    } catch (e) {
      dispatch({ type: 'LOAD_SEARCH_RESULTS_ERROR', payload: e.message });
    }
  }, []);

  const goToPage = useCallback((page) => {
    if (page)
      dispatch({
        type: 'SET_PAGE',
        payload: page,
      });
  }, []);

  return (
    <SearchContext.Provider value={{ ...state, loadSearchResults, goToPage }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
