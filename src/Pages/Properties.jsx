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
  const [selectedLocation, setSelectedLocation] = useState("Any Location");
  const [selectedType, setSelectedType] = useState("Any Type");
  const [selectedStatus, setSelectedStatus] = useState("Any Status");
  const [payment, setPayment] = useState([]);
  const [property, setProperty] = useState([]);

  useEffect(() => {
    axios.get("/payment").then((res) => {
      console.log(res.data);
      setPayment(res.data);
    });
  }, [axios]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

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

  // Function to filter properties based on location, type, status, price range, and search term
  const filterProperties = (property) => {
    const matchesLocation =
      selectedLocation === "Any Location" ||
      property.location === selectedLocation;
    const matchesType =
      selectedType === "Any Type" || property.type === selectedType;
    const matchesStatus =
      selectedStatus === "Any Status" || property.status === selectedStatus;
    const matchesPriceRange = property.price <= priceRange;
    const matchesSearchTerm = property.type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    console.log("Selected Location:", selectedLocation);
    console.log("Property Location:", property.location);
    return (
      matchesLocation &&
      matchesType &&
      matchesStatus &&
      matchesPriceRange &&
      (searchTerm === "" || matchesSearchTerm)
    );
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
            handleLocationChange={handleLocationChange}
            handleTypeChange={handleTypeChange}
            handleStatusChange={handleStatusChange}
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
