import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Cards = ({property}) => {
    const {_id, image, title, location, price, status, type } = property;
    return (
        <div>
            <div className="mb-20 group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl ">
      <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
        <img className="h-52 object-cover w-full" src={image} alt={title}  />
      </div>
      <div className="p-4 md:p-6">

        <h3 className="text-xl font-semibold text-gray-600">
          {title}
        </h3>
        <span className="block mb-1 mt-3 text-xs font-semibold uppercase text-blue-600">
          {location}
        </span>
        <p className="mt-3 text-gray-600">
          {type}
        </p>
        <p className="mt-3 text-gray-600">
          ${price}
        </p>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ">
        <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-600 shadow-sm hover:bg-gray-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none" 
        to=''
        >
          View Details
        </Link>

      </div>
    </div>
        </div>
    );
};

Cards.propTypes = {
    property: PropTypes.shape({
      _id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      location: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      type: PropTypes.string,
    }),
  };

export default Cards;