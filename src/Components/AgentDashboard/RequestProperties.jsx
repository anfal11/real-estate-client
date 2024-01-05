import  { useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSec from '../../Hooks/useAxiosSec';
import toast from 'react-hot-toast';

const RequestProperties = () => {
  const [offers, setOffers] = useState([]);
  const {user} = useAuth();
  const axios = useAxiosSec();
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/offer');
        const data = await response.json();
        const dataAgent = data.filter(data => data.agentEmail === user.email);
        setOffers(dataAgent);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [user.email]); // Empty dependency array ensures the effect runs once on mount

  const handleAccept = (offerId) => {
    try {
      axios.put(`/api/v1/offer/${offerId}/accept`)
      .then(response => {
        console.log(response.data);
        toast.success("Offer accepted!");
        setOffers(prevOffers =>
          prevOffers.map((offer) =>
            offer._id === offerId ? { ...offer, status: 'accepted' } : offer
          )
        );
      })
      // Update the local state using the functional form of setOffers
     
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };
  
  const handleReject = async (offerId) => {
    try {
      await fetch(`/api/v1/offer/${offerId}/reject`, {
        method: 'PUT',
      });
  
      // Update the local state using the functional form of setOffers
      setOffers(prevOffers =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, status: 'rejected' } : offer
        )
      );
    } catch (error) {
      console.error('Error rejecting offer:', error);
    }
  };
  

  return (
    <div className='max-w-7xl mx-auto'>
    <h1 className="text-3xl text-gray-600 font-bold text-center my-16">
        {" "}
        Requested Properties
      </h1>
      <table className="table">
        <thead className='text-center'>
          <tr>
          <th>Index</th>
            <th>Property Title</th>
            <th>Property Location</th>
            <th>Buyer Email</th>
            <th>Buyer Name</th>
            <th>Offered Price</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {offers?.map((offer, index) => (
            <tr key={offer._id} className="hover">
            <td> {index+1}</td>
              <td>{offer.propertyName}</td>
              <td>{offer.propertyLocation}</td>
              <td>{offer.buyerEmail}</td>
              <td>{offer.buyerName}</td>
              <td>{offer.offeredAmount}</td>
              <td className='flex gap-2'>
                {offer.status === 'pending' && (
                  <>
                    <button className='btn bg-green-500 text-white' onClick={() => handleAccept(offer._id)}>Accept</button>
                    <button className='btn bg-red-500 text-white' onClick={() => handleReject(offer._id)}>Reject</button>
                  </>
                )}
              </td>
              <td>{offer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestProperties;
