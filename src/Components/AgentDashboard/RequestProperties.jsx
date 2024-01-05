import  { useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';

const RequestProperties = () => {
  const [offers, setOffers] = useState([]);
  const {user} = useAuth();

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

  const handleAccept = async (offerId) => {
    // Make a PUT request to update the offer status on the backend
    try {
      await fetch(`/api/v1/offer/${offerId}/accept`, {
        method: 'PUT',
      });

      // Update the local state
      const updatedOffers = offers.map((offer) =>
        offer._id === offerId ? { ...offer, status: 'accepted' } : offer
      );
      setOffers(updatedOffers);
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  const handleReject = async (offerId) => {
    // Make a PUT request to update the offer status on the backend
    try {
      await fetch(`/api/v1/offer/${offerId}/reject`, {
        method: 'PUT',
      });

      // Update the local state
      const updatedOffers = offers.map((offer) =>
        offer._id === offerId ? { ...offer, status: 'rejected' } : offer
      );
      setOffers(updatedOffers);
    } catch (error) {
      console.error('Error rejecting offer:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
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
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td>{offer.propertyName}</td>
              <td>{offer.propertyLocation}</td>
              <td>{offer.buyerEmail}</td>
              <td>{offer.buyerName}</td>
              <td>{offer.offeredAmount}</td>
              <td>
                {offer.status === 'pending' && (
                  <>
                    <button onClick={() => handleAccept(offer._id)}>Accept</button>
                    <button onClick={() => handleReject(offer._id)}>Reject</button>
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
