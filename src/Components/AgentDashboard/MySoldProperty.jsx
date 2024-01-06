import  { useState, useEffect } from "react";
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

        if (!response.ok) {
          if (response.status === 404) {
            console.log("Resource not found");
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        }

        const data = response.data;
        console.log(data);
        const filteredSoldProperties = data.filter(
          (item) => item.agentMail === user.email && item.isPaid
        );
        setSoldProperties(filteredSoldProperties);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSoldProperties();
  }, [axios, user.email]);

  return (
    <div className="max-w-7xl mx-auto mt-10">
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
                <td>{property.property.title}</td>
                <td>{property.property.location}</td>
                <td>{property.buyerEmail}</td>
                <td>{property.buyerName}</td>
                <td>{property.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperty;
