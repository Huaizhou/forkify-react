import icon from '../img/icons.svg';

const Error = ({ message }) => {
  return (
    <div className="error">
      <div>
        <svg>
          <use xlinkHref={`${icon}#icon-alert-triangle`}></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Error;
