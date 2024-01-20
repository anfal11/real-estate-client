import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/users`);
        const data = await response.json();
        const filteredData = data.filter((item) => item.email === user?.email);
        setCurrentUser(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div className="max-w-7xl mx-auto">
          <Helmet>
        <title>Real Estate | My Profile </title>
      </Helmet>
      <p className="text-center font-bold my-10 text-base md:text-2xl lg:text-3xl text-gray-600">
        This is {currentUser[0]?.name}&apos;s Profile
      </p>

      <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-xl rounded-lg p-4">
          <p className="text-center font-bold text-xl lg:text-base xl:text-xl text-gray-600">
            Name
          </p>
          <p className="text-center my-6 font-bold text-xl lg:text-base xl:text-xl text-gray-600">
            {currentUser[0]?.name}
            {currentUser[0]?.role && ` (${currentUser[0]?.role})`}
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4">
          <p className="text-center font-bold text-xl lg:text-base xl:text-xl text-gray-600">
            Email
          </p>
          <p className="text-center font-bold my-6 text-xl lg:text-base xl:text-xl text-gray-600">
            {currentUser[0]?.email}
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4">
          <p className="text-center font-bold text-xl lg:text-base xl:text-xl text-gray-600">
            Photo
          </p>
          <img
            className="mx-auto w-20 rounded-full"
            src={currentUser[0]?.image}
            alt="user"
          />
        </div>
        <div className="mt-10 bg-blue-600 flex items-center text-white w-44 gap-4 h-16 p-3 font-bold shadow-xl rounded-lg text-xl">
          <FaRegEdit className="text-white text-2xl" />
          <NavLink to={`/dashboard/editProfile/${currentUser[0]?._id}`}>
            Edit Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
