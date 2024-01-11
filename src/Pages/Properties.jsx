import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Cards from "../Components/AllProperty.jsx/Cards";
import Searchbar from "../Components/AllProperty.jsx/Searchbar";
import Sorting from "../Components/AllProperty.jsx/Sorting";
import { useEffect, useState } from "react";

const Properties = () => {
  const axios = useAxios();

  // State variables for sorting and price range
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState(600000); 
  const [searchTerm, setSearchTerm] = useState("");
  const [payment, setPayment] = useState([]);

  // Function to handle sorting change
  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      // Toggle sorting order if the same criteria is clicked
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Set new sorting criteria and default order to 'asc'
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  // Function to sort properties based on the current sorting criteria and order
  const sortProperties = (a, b) => {
    const orderFactor = sortOrder === "asc" ? 1 : -1;
    return orderFactor * (a[sortBy] - b[sortBy]);
  };

  // Function to filter properties based on price range and search term
  const filterProperties = (property) => {
    const matchesPriceRange = property.price <= priceRange;
    const matchesSearchTerm = property.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPriceRange && (searchTerm === "" || matchesSearchTerm);
  };


  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axios.get("api/v1/properties");
      return res.data;
    },
  });

  // useEffect(()=> {
  //   axios.get("/payment")
  //   .then(res => {
  //     console.log(res.data);
  //     setPayment(res.data)
  //   })
  // },[axios])

  return (
    <div>
      <Helmet>
        <title>Real Estate | Properties </title>
      </Helmet>
      <Navbar />
      <div className="py-32">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="max-w-7xl mx-auto flex justify-center">
        <Sorting
          handleSortChange={handleSortChange}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        </section>

        <section className="max-w-7xl mx-auto gap-4 px-4 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {properties
            .filter(filterProperties)
            .sort(sortProperties)
            .map((property) => (
              <Cards key={property._id} property={property} />
            ))}
        </section>
      </div>
    </div>
  );
};

export default Properties;
