import { GiHamburgerMenu } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAddHome } from "react-icons/md";
import { BsHouseHeartFill } from "react-icons/bs";
import { BsFillHouseDashFill } from "react-icons/bs";
import { FaHouseCircleExclamation } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAgent from "../Hooks/useAgent";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  const {logOut} = useAuth();
  // console.log(isAdmin);

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

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-2">
          <GiHamburgerMenu className="text-4xl m-4 lg:hidden" />
        </label>

        <div>
        <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-blue-600 text-base-content">
          {/* Sidebar content here */}
          
          {/* admin dashboard */}

          {
            isAdmin &&
            <>
              <li>
                <NavLink to="/dashboard/profile" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProperties" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Manage Properties</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Manage users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageReviews" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Manage reviews</NavLink>
              </li>
            </>
          }

          {/* agent dashboard */}
          
            {
              isAgent && 
              <>
            <li>
            
                <NavLink to='/dashboard/profile' className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <FaCircleUser className="text-white text-3xl mr-3" />
                Agent Profile
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/addProperty" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <MdOutlineAddHome className="text-white text-3xl mr-3" />
                Add Property
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/myAddedProperty" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <BsHouseHeartFill className="text-white text-3xl mr-3"/>
                My added properties
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/mySoldProperty" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <BsFillHouseDashFill className="text-white text-3xl mr-3"/>
                My sold properties
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/reqProperties" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <FaHouseCircleExclamation className="text-white text-3xl mr-3"/>
                Requested properties
                </NavLink>
              </li>
            </>
            }


            {/* user dashboard */}

            {
              !isAdmin && !isAgent &&
              <>
            
            <li>
            
                <NavLink to='/dashboard/profile' className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <FaCircleUser className="text-white text-3xl mr-3" />
                My Profile
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/wishlist" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <GiSelfLove className="text-white text-3xl mr-3" />
                Wishlist
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/propertyBuy" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <MdAttachMoney className="text-white text-3xl mr-3"/>
                Property bought
                </NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/myReviews" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <FaRegStar className="text-white text-3xl mr-3"/>
                My Reviews
                </NavLink>
              </li>
            </>
            }
           
          

          <div className="divider"></div> 
          <li>
                <NavLink to="/" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <FaHome className="text-white text-3xl mr-3"/>
                Home</NavLink>
              </li>
          <li>
                <NavLink to="/properties" className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <BiSolidBuildingHouse className="text-white text-3xl mr-3"/>
                All Properties</NavLink>
              </li>
          
          <div className="divider"></div>
          <li>
                <button onClick={handleLogOut} className="menu text-base lg:text-2xl p-5 text-white text-left hover:bg-blue-900 hover:text-white">
                <IoLogOutOutline className="text-white text-3xl mr-3"/>
                Logout</button>
              </li>
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;
