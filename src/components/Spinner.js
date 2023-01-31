import icon from '../img/icons.svg';
const Spinner = () => {
  return (
    <div className="spinner">
      <svg>
        <use xlinkHref={`${icon}#icon-loader`}></use>
      </svg>
    </div>
  );
};

export default Spinner;
