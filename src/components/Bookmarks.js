import icon from '../img/icons.svg';
import { useContext } from 'react';
import BookmarkContext from '../context/BookmarkContext';
import Result from './Result';

const Bookmarks = () => {
  const { bookmarks } = useContext(BookmarkContext);
  return (
    <div className="bookmarks">
      <ul className="bookmarks__list">
        {bookmarks.length > 0 ? (
          bookmarks.map((result, index) => (
            <Result key={index} result={result} />
          ))
        ) : (
          <div className="message">
            <div>
              <svg>
                <use xlinkHref={`${icon}#icon-smile`}></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Bookmarks;
