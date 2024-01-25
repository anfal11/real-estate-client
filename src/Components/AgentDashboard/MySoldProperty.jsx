import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";

const MySoldProperty = () => {
  const [soldProperties, setSoldProperties] = useState([]);
  const [soldProperties2, setsoldProperties2] = useState([]);
  const { user } = useAuth();
  const axios = useAxios();
  const [showPropertyBought1, setShowPropertyBought1] = useState(true);

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await axios.get("/api/v1/offer");

        const d = response.data;
        // console.log(d);
        const filteredSoldProperties = d.filter((item) => item.agentEmail === user.email);
        // console.log(filteredSoldProperties);
        setSoldProperties(filteredSoldProperties);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSoldProperties();
  }, [axios, user.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://real-estate-server-xi.vercel.app/payment");

        // if (!response.ok) {
        //   if (response.status === 404) {
        //     console.log("Resource not found");
        //   } else {
        //     throw new Error(`Error: ${response.statusText}`);
        //   }
        // }

        const data = await response.json();
        console.log(data);
        const filterbymail = data.filter(
          (item) => item.property.agentEmail === user.email
        );
        console.log(filterbymail);
        setsoldProperties2(filterbymail);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [user.email]);

  const handleButtonClick = (showFirst) => {
    setShowPropertyBought1(showFirst);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-2">
          <Helmet>
        <title>Real Estate | My sold properties </title>
      </Helmet>
     <h1 className="text-4xl font-bold text-center text-gray-500">My Sold Properties</h1>
          <div className="flex gap-4 justify-center my-4">
        <button
          className="btn bg-yellow-500 hover:bg-yellow-900 text-white"
          onClick={() => handleButtonClick(true)}
        >
          Offered sold Property
        </button>
        <button
          className="btn bg-green-500 hover:bg-green-900 text-white"
          onClick={() => handleButtonClick(false)}
        >
          Online sold Property
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
            <th>Index</th>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {
              showPropertyBought1 ? 
              soldProperties.map((property, index) => (
              <tr key={property._id}>
              <td>{index+1}</td>
                <td>{property.propertyName}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.buyerEmail}</td>
                <td>{property.buyerName}</td>
                <td>{property.offeredAmount}</td>
              </tr>
            )) : soldProperties2.map((property, index) => (
                <tr key={property._id}>
                <td>{index+1}</td>
                    <td>{property.property.title}</td>
                    <td>{property.property.location}</td>
                    <td>{property.userDetails.email}</td>
                    <td>{property.userDetails.name}</td>
                    <td>{property.property.price}</td>
                </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperty;
