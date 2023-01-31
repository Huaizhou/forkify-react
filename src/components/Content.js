import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';
import Error from './Error';
import icon from '../img/icons.svg';
import ResultContext from '../context/ResultContext';
import BookmarkContext from '../context/BookmarkContext';

/**
 * Recipe detail area
 * @returns Content Component
 */
const Content = () => {
  const id = useLocation().pathname;

  const { loading, error, recipe, loadOneResult, updateServingsByOne } =
    useContext(ResultContext);

  const { addBookmark, removeBookmark, bookmarks } =
    useContext(BookmarkContext);

  useEffect(() => {
    if (id !== '/') {
      loadOneResult(id);
    }
  }, [id, loadOneResult]);

  const handleMinus = () => {
    if (recipe.servings * 1 > 1) {
      updateServingsByOne(recipe.servings * 1 - 1);
    }
  };
  const handlePlus = () => {
    updateServingsByOne(recipe.servings * 1 + 1);
  };
  const handleBookmark = () => {
    bookmarks.some((el) => el.id === recipe.id)
      ? removeBookmark(recipe.id)
      : addBookmark(recipe);
  };

  return (
    <div className="recipe">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error message={error} />
      ) : id === '/' ? (
        <div className="message">
          <div>
            <svg>
              <use xlinkHref={`${icon}#icon-smile`}></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      ) : (
        <>
          <figure className="recipe__fig">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{recipe.title}</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use xlinkHref={`${icon}#icon-clock`}></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {recipe.cookingTime}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>

            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use xlinkHref={`${icon}#icon-users`}></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {recipe.servings}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={handleMinus}
                >
                  <svg>
                    <use xlinkHref={`${icon}#icon-minus-circle`}></use>
                  </svg>
                </button>
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={handlePlus}
                >
                  <svg>
                    <use xlinkHref={`${icon}#icon-plus-circle`}></use>
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`recipe__user-generated ${recipe.key ? '' : 'hidden'}`}
            >
              <svg>
                <use xlinkHref={`${icon}#icon-user`}></use>
              </svg>
            </div>

            <button
              className="btn--round btn--bookmark"
              onClick={handleBookmark}
            >
              <svg className="">
                <use
                  xlinkHref={`${icon}#icon-bookmark${
                    bookmarks.some((el) => el.id === recipe.id) ? '-fill' : ''
                  }`}
                ></use>
              </svg>
            </button>
          </div>

          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            {recipe.ingredients ? (
              <ul className="recipe__ingredient-list">
                {recipe.ingredients.map((ing, index) => (
                  <li className="recipe__ingredient" key={index}>
                    <svg className="recipe__icon">
                      <use xlinkHref={`${icon}#icon-check`}></use>
                    </svg>
                    <div className="recipe__quantity">
                      {ing.quantity === null || ing.quantity === 0
                        ? ''
                        : ing.quantity}
                    </div>
                    <div className="recipe__description">
                      <span className="recipe__unit">
                        {ing.unit === null ? '' : ing.unit}
                      </span>
                      {ing.description}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              ''
            )}
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher"> {recipe.publisher}</span>.
              Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={recipe.sourceUrl}
              target="#"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use xlinkHref={`${icon}#icon-arrow-right`}></use>
              </svg>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
