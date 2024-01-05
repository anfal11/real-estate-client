import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSec from "../../Hooks/useAxiosSec";


const Wishlist = () => {
  const [favorite, setFavorite] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSec();


  const [offerForm, setOfferForm] = useState({
    propertyId: "",
    offeredAmount: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/wishlist")
      .then((res) => {
        const filterFavorite = res.data?.filter(
          (r) => r?.email === user?.email
        );
        console.log(filterFavorite);
        setFavorite(filterFavorite);
      })

      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [user?.email]);

  const removeFromWishlist = async (propertyId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this property!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/v1/wishlist/${propertyId}`);
        const updatedFavorite = favorite.filter((fav) => fav._id !== propertyId);
        setFavorite(updatedFavorite);
        Swal.fire("Deleted!", "Your property has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };


  // offer 
  const handleOfferInputChange = (e) => {
    const { name, value } = e.target;
    setOfferForm({
      ...offerForm,
      [name]: value,
    });
  };

  const makeOffer = async () => {
    try {
      const response = await axiosSecure.post(
        "/api/v1/make-offer", 
        {
          propertyId: offerForm.propertyId,
          offeredAmount: offerForm.offeredAmount,
        }
      );
      console.log(response.data);

      setOfferForm({
        propertyId: "",
        offeredAmount: "",
      });

      Swal.fire("Offer Made!", "Your offer has been submitted.", "success");
    } catch (error) {
      console.error("Error making offer:", error);
      Swal.fire("Error", "Failed to make the offer.", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-gray-600 font-bold text-center my-16">
        {" "}
        My Wishlists: {favorite?.length}
      </h1>

      {favorite?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5 md:px-10 mb-20 max-w-7xl mx-auto">
          {favorite?.map((fav) => (
            <div key={fav._id} className="bg-gray-100 p-5 rounded-md shadow-md">
            <div className="h-52 mb-4 flex flex-col justify-center items-center rounded-t-xl">
        <img className="h-52 object-cover w-full rounded-xl" src={fav?.image} alt={fav?.title}  />
      </div>
            
            
              <h1 className="text-xl font-bold text-gray-600">
                {" "}
                {fav?.title}{" "}
              </h1>
              <p className="h-16 text-lg text-blue-600 font-semibold">
                {" "}
                {fav?.location}{" "}
              </p>
              <p className="text-lg text-gray-600 font-semibold">
                {" "}
                ${fav?.price}{" "}
              </p>
              <p className="text-lg text-gray-600 h-52"> {fav?.description} </p>

              <div className="flex justify-center gap-1 md:gap-4">
                <button className="btn bg-indigo-600 text-white hover:bg-indigo-900" onClick={() =>
                setOfferForm({
                  propertyId: fav._id,
                  offeredAmount: "",
                })
              }>
                  <MdOutlineLocalOffer className="md:text-2xl" />
                  Make an offer
                </button>

                     {/* Offer Form */}
            {offerForm.propertyId === fav._id && (
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Offered Amount"
                  name="offeredAmount"
                  value={offerForm.offeredAmount}
                  onChange={handleOfferInputChange}
                />
                <button
                  className="btn bg-green-500 text-white"
                  onClick={makeOffer}
                >
                  Make Offer
                </button>
              </div>
            )}
                <button className="btn bg-pink-600 text-white hover:bg-pink-900"
                onClick={() => removeFromWishlist(fav._id)}
                >
                  <MdDeleteOutline className="md:text-2xl" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <img className="w-52" src="https://i.ibb.co/0ybdrqb/delete.png" alt="" />
            <h1 className="text-3xl text-gray-600 font-bold text-center my-16">
          No Wishlists Found
        </h1>
        </div>
        
      )}
    </div>
  );
};

export default Wishlist;
