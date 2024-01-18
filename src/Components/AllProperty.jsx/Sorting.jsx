import PropTypes from "prop-types";

const Sorting = ({
  handleLocationChange,
  handleTypeChange,
  handleStatusChange,
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
        <input
          type="range"
          min='600'
          max="600000"
          value={priceRange}
          className="range text-blue-600 w-44"
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
        />
      </div>

      <div className="flex gap-3 my-10">
        {/* location */}
        <select className="border p-2 outline-none border-r-gray-500" onChange={handleLocationChange}>
          <option value="Any Location">Any Location</option>
          <option value="Uttara">Uttara</option>
          <option value="Dhanmondi">Dhanmondi</option>
          <option value="Gulshan">Gulshan</option>
          <option value="Banani">Banani</option>
          <option value="Savar">Savar</option>
          <option value="Mirpur">Mirpur</option>
          <option value="Mohammadpur">Mohammadpur</option>
          <option value="New Eskaton">New Eskaton</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Bir Uttam Road">Bir Uttam Road</option>
        </select>
        {/* type */}
        <select className="border p-2 outline-none border-r-gray-500" onChange={handleTypeChange}>
          <option value="Any Type">Any Type</option>
          <option value="Room">Room</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Duplex">Duplex</option>
        </select>
        <select className="border p-2 outline-none border-r-gray-500" onChange={handleStatusChange}>
          <option value="Any Status">Any Status</option>
          <option value="For Rent">For Rent</option>
          <option value="For Sale">For Sale</option>
        </select>
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
