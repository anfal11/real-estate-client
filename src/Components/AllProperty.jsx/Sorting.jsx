import PropTypes from "prop-types";

const Sorting = ({
  handleSortChange,
  setPriceRange,
  priceRange,
  sortBy,
  sortOrder,
}) => {
  return (
    <section>
      {/* Add UI to display sorting options */}
      <div className="mb-4">
        <button className="text-gray-600 font-bold" onClick={() => handleSortChange("price")}>
          Sort by Price
          {sortBy === "price" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
        </button>
      </div>

      {/* Add range input for filtering based on price */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-gray-600 font-bold" htmlFor="priceRange">Price Range: ${priceRange}</label>
        {/* <input
          type="range"
          min={600}
          max={600000} // Adjust the max value based on your data
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
        /> */}
        <input
          type="range"
          min='600'
          max="600000"
          value={priceRange}
          className="range text-blue-600 w-44"
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
        />
      </div>
    </section>
  );
};

Sorting.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  priceRange: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default Sorting;
