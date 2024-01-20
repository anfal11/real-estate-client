import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const PropertyDetails = () => {

  const [property, setProperty] = useState();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const {user } = useAuth();
  const { id } = useParams();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   address: "",
  //   phoneNumber: "",
  // });
  const [paymentData, setPaymentData] = useState({});

  // console.log(formData);
  console.log(paymentData);

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/properties/${id}`
        );
        const data = await response.json();
        setProperty(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handlePay = async (e) => {
    e.preventDefault();
  
    try {
      // Set the payment data, not the form data
      setPaymentData({
        id: property?._id,
        propertyName: property?.title,
        name: e.target.name.value,
        address: e.target.address.value,
        email: e.target.email.value,
        phoneNumber: e.target.phoneNumber.value,
        price: property?.price,
      });
  
      console.log("Payment submitted");
  
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: property?._id,
          propertyName: property?.title,
          name: e.target.name.value,
          address: e.target.address.value,
          email: e.target.email.value,
          phoneNumber: e.target.phoneNumber.value,
          price: property?.price,
        }),
      });
  
      const result = await response.json();
      window.location.replace(result.url);
      console.log(result);
      toast.success("Redirecting to payment options page");
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle payment error
    }
  };
  

  const addToWishlist = async () => {
    try {
      const requestBody = {
        id: property?._id,
        email: user?.email,
        image: property?.image,
        title: property?.title,
        location: property?.location,
        price: property?.price,
        agentName: property?.agentName,
        agentEmail: property?.agentEmail,
        status: property?.status,
        type: property?.type,
        description: property?.description,
      };
  
      await fetch(`http://localhost:5000/api/v1/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      toast.success("Property added to wishlist");
      setIsInWishlist(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Already added to wishlist");
    }
  };
  

  const removeFromWishlist = async () => {
    try {
      const propertyId = property?.propertyId;
      if (!propertyId) {
        toast.error("Go to dashboard and remove from wishlist");
        return;
      }
  
      await fetch(`http://localhost:5000/api/v1/wishlist/${propertyId}`, {
        method: "DELETE",
      });
  
      toast.success("Property removed from wishlist");
      setIsInWishlist(false);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };
  
  
  
  
  

  return (
    <div className="pt-28 px-10">
          <Helmet>
        <title>Real Estate | Details </title>
      </Helmet>
      <section className="max-w-7xl mx-auto">
        <div>
          <h3 className="text-4xl my-10 font-semibold text-gray-600">
            {property?.title}
          </h3>
          <div className="mb-20 group flex flex-col h-full bg-white rounded-xl ">
            <div className="flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
              <img
                className="object-cover w-full"
                src={property?.image}
                alt={property?.title}
              />
            </div>

            <div className="p-4 md:p-6">
              <div className="flex items-center gap-10">
                {property?.status === "For Sale" ? (
                  <p className="mt-3 text-gray-600 font-extrabold bg-yellow-400 w-24 p-4 text-center rounded-e-full">
                    {property?.status}
                  </p>
                ) : (
                  <p className="mt-3 text-white font-bold bg-blue-600 w-24 p-4 text-center rounded-e-full">
                    {property?.status}
                  </p>
                )}

                <span className="flex items-center gap-3">
                  <span className="text-2xl font-medium border-l-2 border-gray-600 pl-2">
                    {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  </span>
                  {isInWishlist ? (
                    <MdFavorite
                      className="text-3xl cursor-pointer"
                      onClick={removeFromWishlist}
                    />
                  ) : (
                    <MdFavoriteBorder
                      className="text-3xl cursor-pointer"
                      onClick={addToWishlist}
                    />
                  )}
            
                </span> 
               
              </div>
              <span className="my-3 btn bg-pink-500 hover:bg-pink-800 text-white text-2xl font-medium border-gray-600 pl-2" onClick={openPaymentModal}>
                  <FaCreditCard /> Make Payment
                  </span>

                    {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Payment Form</h2>
            <form onSubmit={handlePay}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  // value={formData.name}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  // value={formData.address}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  // value={formData.address}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  // value={formData.phoneNumber}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={property?.price}
                  readOnly
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                />
              </div>
              <button
                type="submit"
                className="btn bg-pink-500 hover:bg-pink-800 text-white text-lg font-medium border-gray-600"
              >
                Pay
              </button>
        
            </form>

            <button className="btn mt-2 bg-red-400 text-white" onClick={closePaymentModal}>
              Close
            </button>
           

             {/* Display the collected payment data */}
             {paymentData && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Payment Details:</h3>
                <p>Name: {paymentData.name}</p>
                <p>Address: {paymentData.address}</p>
                <p>Address: {paymentData.email}</p>
                <p>Phone Number: {paymentData.phoneNumber}</p>
                <p>Price: ${paymentData.price}</p>
              </div>
            )}
          </div>
        </div>
      )}



              <span className="block mb-1 mt-3 text-3xl font-semibold uppercase text-blue-600">
                {property?.location}
              </span>
              <p className="mt-3 text-gray-600 text-xl font-bold">
                <span className="underline">About this {property?.type}:</span>{" "}
                {property?.description}
              </p>
              <p className="mt-3 text-gray-600 text-xl font-bold">
                Type: {property?.type}
              </p>
              <p className="mt-3 text-gray-600 text-xl font-semibold">
                ${property?.price}
              </p>
              <p className="mt-3 text-gray-600 text-xl font-bold">
              Agent name: {property?.agentName}
              </p>
              <p className="mt-3 text-gray-600 text-xl font-bold">
                Agent email: {property?.agentEmail}
              </p>
              <p className="mt-3 text-gray-600 text-xl font-bold">
                Agent number: {property?.agentNumber}
              </p>


              <button
                onClick={() => window.history.back()}
                className="btn mt-10 bg-blue-600 text-white hover:bg-blue-400"
              >
                {" "}
                Go Back{" "}
              </button>
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
