import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex items-center">
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
        <ul className="menu p-4 w-80 min-h-full bg-blue-500 text-base-content">
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
                <NavLink to="/dashboard/profile" className="menu text-base lg:text-2xl p-5 text-white text-center hover:bg-blue-900 hover:text-white">My Profile</NavLink>
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
          

        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
