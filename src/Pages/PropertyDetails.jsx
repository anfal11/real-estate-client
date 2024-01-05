import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const PropertyDetails = () => {

  const [property, setProperty] = useState();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const {user } = useAuth();
  const { id } = useParams();
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
