import  { useState, useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    // Fetch properties from the server
    axios.get('/api/v1/admin/properties')
      .then(response => 
        {
            setProperties(response.data)
        }
        )
      .catch(error => console.error('Error fetching properties:', error));
  }, [axios]);

  const handleVerify = (propertyId) => {
    axios.patch(`/api/v1/properties/verify/${propertyId}`)
      .then(response => {
        // Update the UI if necessary
        // For example, remove the "Verify" and "Reject" buttons, show the status as "verified"
        setProperties(prevProperties => {
          const updatedProperties = prevProperties.map(property => {
            if (property._id === propertyId) {
              return { ...property, verified: true };
            }
            return property;
          });
          return updatedProperties;
        });
      })
      .catch(error => console.error('Error verifying property:', error));
  };
  
  const handleReject = (propertyId) => {
    axios.patch(`/api/v1/properties/reject/${propertyId}`)
      .then(response => {
        // Update the UI if necessary
        // For example, remove the "Verify" and "Reject" buttons, show the status as "rejected"
        setProperties(prevProperties => {
          const updatedProperties = prevProperties.map(property => {
            if (property._id === propertyId) {
              return { ...property, verified: false };
            }
            return property;
          });
          return updatedProperties;
        });
      })
      .catch(error => console.error('Error rejecting property:', error));
  };
  

  return (
    <div className='max-w-7xl mx-auto px-10 mt-20'>
    <h1 className="text-3xl font-bold my-10 text-center">Manage Properties</h1>
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Location</th>
            <th>Agent Name</th>
            <th>Agent Email</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={property._id}>
              <th>{index + 1}</th>
              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>{property.agentName}</td>
              <td>{property.agentEmail}</td>
              <td>{property.price}</td>
              <td>
                {property.verified === false && (
                  <>
                    <button className='btn btn-ghost' onClick={() => handleVerify(property._id)}>Verify</button>
                    <button className='btn btn-ghost' onClick={() => handleReject(property._id)}>Reject</button>
                  </>
                )}
                {property.verified === true && <span>Verified</span>}
                {property.verified === false && <span>Rejected</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ManageProperties;
