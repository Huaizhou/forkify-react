import { useContext, useState } from 'react';
import SearchContext from '../context/SearchContext';
import icon from '../img/icons.svg';

/**
 * Search area in header
 * @returns Search Component
 */
const Search = () => {
  const [query, setQuery] = useState('');
  const { loadSearchResults } = useContext(SearchContext);
  const searchHandler = (e) => {
    e.preventDefault();
    if (query) {
      loadSearchResults(query);
    }

    // Clear query for input box
    setQuery('');
  };

  return (
    <form className="search" onSubmit={searchHandler}>
      <input
        type="text"
        className="search__field"
        data-testid="test-search__field"
        placeholder="Search over 1,000,000 recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn search__btn" data-testid="test-search__btn">
        <svg className="search__icon">
          <use xlinkHref={`${icon}#icon-search`} />
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

export default Search;
