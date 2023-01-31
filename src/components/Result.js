import icon from '../img/icons.svg';
import { useContext } from 'react';
import ActiveContext from '../context/ActiveContext';

const Result = ({ result }) => {
  const { id, updateID } = useContext(ActiveContext);
  const handleClick = (id) => {
    updateID(id);
  };

  return (
    <li className="preview" key={result.id}>
      <a
        className={`preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }`}
        href={`#${result.id}`}
        onClick={() => handleClick(result.id)}
      >
        <figure className="preview__fig">
          <img src={result.image} alt={result.title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{result.title}</h4>
          <p className="preview__publisher">{result.publisher}</p>
          <div
            className={`preview__user-generated ${result.key ? '' : 'hidden'}`}
          >
            <svg>
              <use xlinkHref={`${icon}#icon-user`}></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Result;
