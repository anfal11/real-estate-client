import { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';




const PropertyBought = () => {
  const [propertyBought, setPropertyBought] = useState([]);
  const [propertyBought2, setPropertyBought2] = useState([]);
  const { user } = useAuth();
  const axios = useAxios();
  const [showPropertyBought1, setShowPropertyBought1] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/offer")
      .then((res) => {
        const filterbymail = res.data.filter(
          (item) => item.buyerEmail === user.email
        );
        setPropertyBought(filterbymail);
      })
      .catch((err) => console.log(err.message));
  }, [axios, user.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/payment");

        if (!response.ok) {
          if (response.status === 404) {
            console.log("Resource not found");
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        }

        const data = await response.json();
        const filterbymail = data.filter(
          (item) => item.userDetails.email === user.email
        );
        setPropertyBought2(filterbymail);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [user.email]);

  const handleButtonClick = (showFirst) => {
    setShowPropertyBought1(showFirst);
  };


  const getChartData = () => {
    return showPropertyBought1
        ? propertyBought.map(item => ({ name: item.propertyName, amount: item.offeredAmount }))
        : propertyBought2.map(item => ({ name: item.property.title, amount: item.property.price }));
};

const calculateYAxisDomain = () => {
    const data = getChartData().map(entry => entry.amount);
    const maxAmount = Math.max(...data);
    const minAmount = Math.min(0, ...data);

    // Adjust the domain to ensure bars are visible for smaller values
    return [minAmount, maxAmount];
};
const calculateTotalAmount = () => {
    const totalAmount = getChartData().reduce((acc, entry) => acc + entry.amount, 0);
    return totalAmount;
  };
const roundChartData = [
    { name: 'Total Property', amount: calculateTotalAmount() },
    ...getChartData()
  ];


  return (
    <div className="max-w-7xl mx-auto my-10">
    <h1 className="text-4xl font-bold text-center text-gray-500">Property Bought</h1>
       <div className="my-12 mx-4 flex flex-col md:flex-row gap-2">
   <ResponsiveContainer className="my-20" width="100%" height={400}>
                <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={calculateYAxisDomain()} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

        
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie dataKey="amount" data={roundChartData} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 justify-center mb-2">
        <button
          className="btn bg-yellow-500 text-white"
          onClick={() => handleButtonClick(true)}
        >
          {" "}
          Offered Property
        </button>
        <button
          className="btn bg-green-500 text-white"
          onClick={() => handleButtonClick(false)}
        >
          Online Pay Property
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Agent Email</th>
              <th>Agent Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount / Price</th>
            </tr>
          </thead>
          <tbody>
            {showPropertyBought1
              ? propertyBought.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.propertyName}</td>
                    <td>{item.propertyLocation}</td>
                    <td>{item.agentEmail}</td>
                    <td>{item.agentName}</td>
                    <td>{item.status}</td>
                    <td>{item.buyingDate}</td>
                    <td>{item.offeredAmount}</td>
                  </tr>
                ))
              : propertyBought2.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.property.title}</td>
                    <td>{item.property.location}</td>
                    <td>{item.property.agentEmail}</td>
                    <td>{item.property.agentName}</td>
                    <td>{item.property.status}</td>
                    <td>{item.successDate}</td>
                    <td>{item.property.price}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyBought;
