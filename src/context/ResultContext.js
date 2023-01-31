import { API_URL, API_KEY } from '../utils/config';
import { AJAX, createRecipeObject, updateServings } from '../utils/helper';
import { createContext, useCallback, useReducer } from 'react';

/**
 * Result Context
 */
export const ResultContext = createContext({});

const initialState = {
  recipe: {},
  loading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_ONE_RESULT_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LOAD_ONE_RESULT_SUCCESS':
      return {
        ...state,
        loading: false,
        recipe: action.payload,
      };
    case 'LOAD_ONE_RESULT_ERROR':
      return {
        ...state,
        recipe: {},
        loading: true,
        error: action.payload,
      };
    case 'UPDATE_SERVINGS_BY_ONE':
      return {
        ...state,
        loading: false,
        recipe: {
          ...state.recipe,
          servings: action.payload.newServings,
          ingredients: action.payload.newIngredients,
        },
      };
    default:
      return state;
  }
};

export const ResultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadOneResult = useCallback(async (id) => {
    // Render spinner
    dispatch({ type: 'LOAD_ONE_RESULT_REQUEST' });

    try {
      const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
      const recipe = createRecipeObject(data);
      if (recipe) {
        dispatch({
          type: 'LOAD_ONE_RESULT_SUCCESS',
          payload: recipe,
        });
      }
    } catch (err) {
      dispatch({
        type: 'LOAD_ONE_RESULT_ERROR',
        payload: err.message,
      });
    }
  }, []);

  const uploadOneResult = useCallback(async (recipe) => {
    // Render spinner
    dispatch({ type: 'LOAD_ONE_RESULT_REQUEST' });

    try {
      const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
      const newRecipe = createRecipeObject(data);
      if (newRecipe) {
        dispatch({
          type: 'LOAD_ONE_RESULT_SUCCESS',
          payload: newRecipe,
        });
      }
    } catch (err) {
      dispatch({
        type: 'LOAD_ONE_RESULT_ERROR',
        payload: err.message,
      });
    }
  }, []);

  const updateServingsByOne = useCallback(
    (newServings) => {
      const ingredients = state.recipe.ingredients.slice();
      const newIngredients = updateServings(
        ingredients,
        state.recipe.servings,
        newServings
      );

      dispatch({
        type: 'UPDATE_SERVINGS_BY_ONE',
        payload: { newIngredients, newServings },
      });
    },
    [state]
  );

  return (
    <ResultContext.Provider
      value={{
        ...state,
        loadOneResult,
        uploadOneResult,
        updateServingsByOne,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContext;
