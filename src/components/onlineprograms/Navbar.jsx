import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import {IoIosMenu, IoIosClose} from 'react-icons/io'
import {TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialTwitter} from 'react-icons/ti'

const Navbar = () => {
  const [menu, openMenu]=useState(false);
  return (
    <div>
      {/* top cta */}
        <div className='text-xs md:text-[16px] text-white gap-2 py-3 px-[4%] bg-[#8B0002] px flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
            <div className='flex gap-x-3'>
            <a className='no-underline text-white font-bold' href="tel:+31(0)10 307 2137">+31(0)10 307 2137</a>
            <a className='no-underline text-white font-bold' href="mailto:info@rsbpp.nl">info@rsbpp.nl</a>
            </div>
            <div className='flex gap-3 text-white'>
              <TiSocialFacebook size='20' />
              <TiSocialTwitter size='20' />
              <TiSocialLinkedin size='20' />
              <TiSocialInstagram size='20' />
            </div>
        </div>
        {/* main nav */}
        <div className="px-[4%] flex justify-between items-center text-sm py-4">
      <img className="w-32 md:w-60 cursor-pointer" src={logo} alt="logo" />
      <ul className="text-[15px] text-black font-medium hidden md:flex md:flex-wrap items-center md:justify-center gap-x-5 gap-y-2">
      <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/">
          <p>HOME</p>
        </NavLink>
        <NavLink className="group relative hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/doctors">
          <p className="">ABOUT US +</p>
          <ul className="z-[100] absolute top-full mt-3 md:min-w-60 hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">Who We Are</li>
            <li className="p-2">Mission/Vision</li>
            <li className="p-2">Our Leadership</li>
            <li className="p-2">Advisory Board</li>
            <li className="p-2">Management Board</li>
            <li className="p-2">Contact Us</li>
          </ul>
        </NavLink>
        <NavLink to='/online-programmes' className="group relative hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
         <p> PROGRAMMES +</p>
         <ul className="z-[100] absolute top-full mt-3 md:min-w-60 hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">Executive Education</li>
            <li className="p-2">Online Programmes</li>
            <li className="p-2">DigiKnowH</li>
          </ul>
        </NavLink>
        <NavLink className="group relative hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>FACULTIES +</p>
         <ul className="z-[100] absolute top-full mt-3 md:min-w-60 hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">Faculty of Business, Communication and Finance</li>
            <li className="p-2">Faculty of Good Governance, and Public Policy</li>
          </ul>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>NEWS&EVENTS</p>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>SUPPORT AND GUIDANCE</p>
        </NavLink>
        <NavLink className="group relative hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>DOWNLOADS +</p>
         <ul className="z-[100] absolute top-full mt-3 md:min-w-60 hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">2024 Course Brochure</li>
          </ul>
        </NavLink>
      </ul>
      <div className="md:hidden bg-[#8B0002] py-2 px-3 text-white rounded-md cursor-pointer" onClick={()=>openMenu(!menu)}>
      {
        menu !== true ? <IoIosMenu size="24" />:<IoIosClose size="24" />
      }
      </div>
    </div>
    {/* Side nav */}
      <div className={`${menu ===true ? 'opacity-1 left-0' : 'opacity-0 left-[-999px]'} md:hidden fixed z-[100] top-0 bottom-0 w-screen h-full bg-[rgba(0,0,0,.8)] transition-all duration-500`}>
      <div className= 'bg-white w-full h-full pt-12'>
    <div className="flex justify-between p-3 px-4">
    <img className="w-32 md:w-60 cursor-pointer" src={logo} alt="logo" />
    <div className="md:hidden bg-[#8B0002] py-2 px-3 text-white rounded-md cursor-pointer" onClick={()=>openMenu(!menu)}>
      {
        menu !== true?<IoIosMenu size="24" />:<IoIosClose size="24" />
      }
      </div>
    </div>
      <ul className="py-5 text-[15px] text-black font-medium flex flex-col gap-y-2">
        <NavLink className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/">
          <p>HOME</p>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/doctors">
          <p className="">ABOUT US +</p>
          <ul className="hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">Who We Are</li>
            <li className="p-2">Mission/Vision</li>
            <li className="p-2">Our Leadership</li>
            <li className="p-2">Advisory Board</li>
            <li className="p-2">Management Board</li>
            <li className="p-2">Contact Us</li>
          </ul>
        </NavLink>
        <NavLink to='/online-programmes' className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
         <p> PROGRAMMES +</p>
         <ul className="hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">Executive Education</li>
            <li className="p-2">Online Programmes</li>
            <li className="p-2">DigiKnowH</li>
          </ul>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>FACULTIES +</p>
         <ul className="hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">Faculty of Business, Communication and Finance</li>
            <li className="p-2">Faculty of Good Governance, and Public Policy</li>
          </ul>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>NEWS&EVENTS</p>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>SUPPORT AND GUIDANCE</p>
        </NavLink>
        <NavLink className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="/contact">
          <p>DOWNLOADS +</p>
         <ul className="hidden group-hover:block bg-gray-100 text-black p-2 w-full">
            <li className="p-2">2024 Course Brochure</li>
          </ul>
        </NavLink>
      </ul>
    </div>
      </div>
    </div>
  );
};

export default Navbar;
