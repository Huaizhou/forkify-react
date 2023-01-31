import { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import Legal from './Legal';
import Spinner from './Spinner';
import Error from './Error';
import Result from './Result';
import Pagination from './Pagination';

/**
 * Result list area in sidebar
 * @returns Result Component
 */
const Results = () => {
  const { search, loading, error, goToPage } = useContext(SearchContext);

  //Get page number
  const numPages = Math.ceil(search.results.length / search.resultsPerPage);

  // Get results of page
  const resultsOnPage = search.results.slice(
    (search.page - 1) * search.resultsPerPage,
    search.page * search.resultsPerPage
  );

  return (
    <div className="search-results">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error message={error} />
      ) : (
        <ul className="results">
          {resultsOnPage.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </ul>
      )}

      <Pagination
        curPage={search.page}
        numPages={numPages}
        handleGoToPage={goToPage}
      />
      <Legal />
    </div>
  );
};

export default Results;
