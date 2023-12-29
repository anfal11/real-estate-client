import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex items-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" ><GiHamburgerMenu className="text-4xl m-4 lg:hidden" /></label>
        
        <Outlet />
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;