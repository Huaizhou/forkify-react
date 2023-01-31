import logo from '../img/logo.png';
import icon from '../img/icons.svg';
import Search from './Search';
import Bookmarks from './Bookmarks';

/**
 * The Header Layout of the main UI
 * @returns Header Component
 */
const Header = ({ handleAddRecipe }) => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />

      <Search />

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className="nav__btn nav__btn--add-recipe"
              onClick={handleAddRecipe}
            >
              <svg className="nav__icon">
                <use xlinkHref={`${icon}#icon-edit`}></use>
              </svg>
              <span>Add recipe</span>
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
              <span>Bookmarks</span>
            </button>

            <Bookmarks />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
