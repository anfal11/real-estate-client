import { useContext, useEffect, useState } from "react";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";


const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [userProfile, setUserProfile] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("User Logout successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setUserProfile({
      name: user?.displayName,
      photo: user?.photoURL,
    });
  }, [user?.displayName, user?.photoURL]);

  const nav = (
    <>
      <li>
        <NavLink 
         className={({ isActive}) =>
    isActive ? "text-blue-300 font-bold border hover:text-white" : "hover:text-white"
  }
        to="/"
        >
        Home
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive}) =>
    isActive ? "text-blue-300 font-bold border hover:text-white" : "hover:text-white"
  } to="/properties">All Properties</NavLink>
      </li>
      <li>
        <NavLink className={({ isActive}) =>
    isActive ? "text-blue-300 font-bold border hover:text-white" : "hover:text-white"
  } to="dashboard">Dashboard</NavLink>
      </li>
      {
        user ? <> <button onClick={handleLogOut} className="btn text-xs btn-ghost pb-3">Logout</button> </> : <><li>
        <NavLink className={({ isActive}) =>
    isActive ? "text-blue-300 font-bold border hover:text-white" : "hover:text-white"
  } to="/login">Log In</NavLink>
      </li> </>
      }
    </>
  );




  return (
    <div>
      <div className="navbar fixed z-40 bg-opacity-50 text-white bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-opacity-90 bg-gray-100 text-black rounded-box w-52"
            >
              {nav}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl hidden lg:block"
          >
          <div className="flex flex-col items-center">
          <img
              src="https://i.ibb.co/NrB3HmX/3d-house.png"
              className="h-8 w-8"
              alt="ACME"
              width="120"
            />
            <p>DreamSpace  Estate</p>
          </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>
        <div className="navbar-end">
          {
            user ? 
            <>
            <p>{user?.displayName}</p> 
            {/* <img className="w-1/4 h-1/4 md:w-[10%] rounded mx-4" src={user?.photoURL} alt="" /> */}
            <img className="w-1/6 h-1/6 md:w-[10%] rounded-full mx-4" src={user?.photoURL} alt="User Photo" />

            </>
            :
            <>
            <p>Guest</p> 
            <img className="rounded-full w-1/4 md:w-[10%] lg:w-[5%] mx-4" src='https://i.ibb.co/QrdfRKF/85434-guest-512x512.png' alt="" />
            </>
          }
        </div>
      </div>
</div>
  );
};

export default Navbar;
