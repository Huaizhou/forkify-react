import icon from '../img/icons.svg';

/**
 * The pagination component
 * @returns Pagination Component
 */

const Pagination = ({ curPage, numPages, handleGoToPage }) => {
  if (curPage === 1 && numPages > 1) {
    return (
      <div className="pagination">
        {curPage === 1 && numPages > 1 ? (
          <button
            className="btn--inline pagination__btn--next"
            onClick={() => handleGoToPage(curPage + 1)}
          >
            <span>Page {curPage + 1}</span>
            <svg className="search__icon">
              <use xlinkHref={`${icon}#icon-arrow-right`}></use>
            </svg>
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }

  if (curPage === numPages && numPages > 1) {
    return (
      <div className="pagination">
        <button
          className="btn--inline pagination__btn--prev"
          onClick={() => handleGoToPage(curPage - 1)}
        >
          <svg className="search__icon">
            <use xlinkHref={`${icon}#icon-arrow-left`}></use>
          </svg>
          <span>Page {curPage - 1}</span>
        </button>
      </div>
    );
  }

  if (curPage < numPages) {
    return (
      <div className="pagination">
        <button
          className="btn--inline pagination__btn--prev"
          onClick={() => handleGoToPage(curPage - 1)}
        >
          <svg className="search__icon">
            <use xlinkHref={`${icon}#icon-arrow-left`}></use>
          </svg>
          <span>Page {curPage - 1}</span>
        </button>
        <button
          className="btn--inline pagination__btn--next"
          onClick={() => handleGoToPage(curPage + 1)}
        >
          <span>Page {curPage + 1}</span>
          <svg className="search__icon">
            <use xlinkHref={`${icon}#icon-arrow-right`}></use>
          </svg>
        </button>
      </div>
    );
  }

  return <div className="pagination"></div>;
};

export default Pagination;
