import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const MySoldProperty = () => {
  const [soldProperties, setSoldProperties] = useState([]);
  const { user } = useAuth();
  const axios = useAxios();

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

  return (
    <div className="max-w-7xl mx-auto mt-10 px-2">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((property) => (
              <tr key={property._id}>
                <td>{property.propertyName}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.buyerEmail}</td>
                <td>{property.buyerName}</td>
                <td>{property.offeredAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperty;
