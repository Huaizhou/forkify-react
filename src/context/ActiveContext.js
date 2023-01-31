import { createContext, useCallback, useReducer } from 'react';

/**
 * Active Context
 */
export const ActiveContext = createContext({});

const initialState = {
  id: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ID':
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export const ActiveContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateID = useCallback((id) => {
    dispatch({
      type: 'UPDATE_ID',
      payload: id,
    });
  }, []);

  return (
    <ActiveContext.Provider value={{ ...state, updateID }}>
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveContext;
