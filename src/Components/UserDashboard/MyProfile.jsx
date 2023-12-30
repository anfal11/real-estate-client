import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-center font-bold my-10 text-base md:text-2xl lg:text-3xl text-gray-600">
        This is {user?.displayName}&apos;s Profile
      </p>

      <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-xl rounded-lg p-4">
          <p className="text-center font-bold text-xl text-gray-600">Name</p>
          <p className="text-center my-6 font-bold text-xl text-gray-600">
            {user?.displayName}
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4">
          <p className="text-center font-bold text-xl lg:text-base xl:text-xl text-gray-600">Email</p>
          <p className="text-center font-bold my-6 text-xl lg:text-base xl:text-xl text-gray-600">
            {user?.email}
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4">
          <p className="text-center font-bold text-xl lg:text-base xl:text-xl text-gray-600">Photo</p>
          <img className="mx-auto w-20 rounded-full" src={user?.photoURL} alt="user" />
        </div>
        <NavLink to='/dashboard/editProfile' className="bg-white text-gray-600 w-36 h-14 p-4 font-bold shadow-xl rounded-lg text-xl">Edit Profile</NavLink>
      </div>
    </div>
  );
};

export default MyProfile;
