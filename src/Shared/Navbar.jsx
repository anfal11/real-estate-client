import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuHidden, setMenuHidden] = useState(true);

    const toggleMenu = () => {
      setMenuHidden(!menuHidden);
    };

    return (
        <div>
                  <nav className="flex flex-wrap items-center justify-between  py-3 px-3 lg:px-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <NavLink to='/'>
        <div className="flex flex-col items-center cursor-pointer">
        <img
          src="https://i.ibb.co/NrB3HmX/3d-house.png"
          className="h-10 w-10"
          alt="ACME"
          width="120"
        />
        <p className="text-white font-semibold"><span>DreamSpace</span> Estate</p>
        </div>
        </NavLink>
        <div className="flex md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
          <HiMenuAlt3 className={`text-white text-4xl toggle ${menuHidden ? 'block' : 'hidden'}`}></HiMenuAlt3>
          <HiX  className={`text-white text-4xl toggle ${menuHidden ? 'hidden' : 'block'}`} />
           
          </button>
        </div>
        <div
        //   className={`toggle ${menuHidden ? 'hidden' : 'block'} w-full lg:w-auto flex flex-col lg:flex-row text-right text-bold mt-5 lg:mt-0 border-t-2 border-white lg:border-none`}
        className={`toggle ${menuHidden ? 'hidden' : 'block'} w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0`}
        >
          <NavLink
            to='/'
            className={({isActive}) => [
                isActive ? 'block md:inline-block text-red-500 hover:text-blue-500 px-3 py-3' : "block md:inline-block text-white hover:text-blue-500 px-3 py-3"
            ]}
          >
            Home
          </NavLink>
          <NavLink
            to='/properties'
            className="block md:inline-block text-white hover:text-blue-500 px-3 py-3"
          >
            All Properties
          </NavLink>
          <NavLink
            to='/dashboard'
            className="block md:inline-block text-white hover:text-blue-500 px-3 py-3"
          >
            Dashboard
          </NavLink>
          <NavLink
          to='/login'
          className='block md:inline-block text-white hover:text-blue-500 px-3 py-3'
        >
          Sign In
        </NavLink>
        </div>
        
      </nav>
        </div>
    );
};

export default Navbar;