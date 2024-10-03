import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState } from "react";
const Navbar = () => {
  const [menu, openMenu]=useState(false);
  return (
    <div>
      {/* top cta */}
        <div className='text-xs md:text-sm text-white gap-2 py-[10px] px-3 bg-[#8B0002] px flex justify-center items-center md:justify-between'>
            <div className='flex gap-2'>
            <a className='no-underline text-white font-bold' href="tel:+31(0)10 307 2137">+31(0)10 307 2137</a>
            <a className='no-underline text-white font-bold' href="mailto:info@rsbpp.nl">info@rsbpp.nl</a>
            </div>
            <div>
            </div>
        </div>
        {/* main nav */}
        <div className="px-3 flex justify-between items-center text-sm py-4">
      <img className="w-32 md:w-60 cursor-pointer" src={logo} alt="logo" />
      <ul className="px-5 flex-1 text-[15px] text-black font-normal hidden md:flex md:flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/">
          HOME
        </NavLink>
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/doctors">
          ABOUT US +
        </NavLink>
        <NavLink to='/online-programmes' className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
          PROGRAMMES +
        </NavLink>
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          FACULTIES +
        </NavLink>
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          NEWS&EVENTS
        </NavLink>
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          SUPPORT AND GUIDANCE
        </NavLink>
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          DOWNLOADS +
        </NavLink>
      </ul>
      <div className="md:hidden" onClick={()=>openMenu(!menu)}>
      {
        menu !== true?<p>Menu</p>:null
      }
      </div>
    </div>
    </div>
  );
};

export default Navbar;
