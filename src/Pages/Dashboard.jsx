import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const {logOut} = useAuth();
  // console.log(isAdmin);
  const {id} = useParams();

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
          
          {
            isAdmin &&
            <>
              <li>
                <NavLink to="/dashboard/adminProfile" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Admin Profile</NavLink>
              </li>
            </>
          }
            <>
            <li>
                <NavLink to={`/dashboard/profile/${id}`} className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">My Profile</NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/wishlist" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Wishlist</NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/propertyBuy" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Property bought</NavLink>
              </li>
            <li>
                <NavLink to="/dashboard/myReviews" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">My Reviews</NavLink>
              </li>
            </>
          

          <div className="divider"></div> 
          <li>
                <NavLink to="/" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Home</NavLink>
              </li>
          <li>
                <NavLink to="/properties" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">All Properties</NavLink>
              </li>
          
          <div className="divider"></div>
          <li>
                <button onClick={handleLogOut} className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">Logout</button>
              </li>
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;