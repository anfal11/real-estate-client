import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../../Hooks/useUser";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const MyAddedProperty = () => {
  const { users } = useUser();
  const [addedProperties, setAddedProperties] = useState([]);

  useEffect(() => {
    const fetchAddedProperties = async () => {
      try {
        const response = await axios.get(
          "https://real-estate-server-xi.vercel.app/api/v1/admin/properties"
        );
        const filteredProperties = response.data.filter(
          (property) => property.agentEmail === users[0]?.email
        );
        setAddedProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching added properties:", error);
      }
    };

    fetchAddedProperties();
  }, [users]);

  const handleDeleteProperty = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this property!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://real-estate-server-xi.vercel.app/api/v1/properties/${_id}`);

        // Remove the property from the local state
        setAddedProperties((prevProperties) =>
          prevProperties.filter((property) => property._id !== _id)
        );

        Swal.fire("Deleted!", "Your property has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
          <Helmet>
        <title>Real Estate | My added properties </title>
      </Helmet>
      <h1 className="text-3xl font-bold my-10 text-center">
        My Added Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {addedProperties.map((property) => (
          <div key={property._id} className="mb-8 border p-4 rounded-md">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            {property?.status === "For Sale" ? (
              <p className="mt-3 mb-3 text-gray-600 font-extrabold bg-yellow-400 w-24 p-4 text-center rounded-e-full">
                {property?.status}
              </p>
            ) : (
              <p className="mt-3 mb-3 text-white font-bold bg-blue-600 w-24 p-4 text-center rounded-e-full">
                {property?.status}
              </p>
            )}
            <h2 className="text-xl font-bold mb-2">{property?.title}</h2>
            <p className="text-blue-600 font-medium mb-2">
              {property?.location}
            </p>
            <p className="text-gray-600 mb-2">{property?.description}</p>
            <p className="text-gray-600 font-bold mb-2">
              Agent: {property?.agentName}
            </p>
            {property.verified === true ? (
              <p className="text-green-500 font-bold mb-2">
                Verification Status: Verified
              </p>
            ) : (
              <p className="text-red-500 font-bold mb-2">
                Verification Status: Rejected
              </p>
            )}
            <p className="text-gray-600 font-medium mb-2">{property?.type}</p>
            <p className="text-gray-600 font-medium mb-2">
              Price: {property?.price}
            </p>

            <div className="flex gap-2">
              <NavLink
                to={`/dashboard/update-property/${property?._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                <span className="flex items-center gap-1">Update <MdEdit className="text-xl" /></span>
              </NavLink>
              <button
                onClick={() => handleDeleteProperty(property?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                 <span className="flex items-center gap-1">Delete <MdDelete className="text-xl" /></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperty;
