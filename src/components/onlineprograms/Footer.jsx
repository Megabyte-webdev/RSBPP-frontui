import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.svg'

const Footer = () => {
  return (
    <div className="p-4 bg-black text-white min-h-96 w-[98%] mx-auto md:w-full">
      <div className="w-[95%] mx-auto border-b border-gray-700 py-8 my-6 flex flex-col md:flex-row justify-between items-end">
        <section className="h-max rounded-md flex-grow md:w-48 max-w-96 w-[98%] m-4 transition-all ease-in-out duration-300">
          <h2 className="flex flex-col gap-y-3 text-xl text-white">
            <img src={logo} className='w-22 md:w-46' />
            <p>Westplein 12-14</p>
<p>3016 BM Rotterdam</p>
<p>The Netherlands</p>
          </h2>
          <p>
            Totam rem aperiam, eaque ipsa quae ab lilo inventore veritatis et
            quasi architecto baetae vitae dicta sunt.
          </p>
        </section>
        <section className="flex-grow flex flex-col justify-end h-max rounded-md md:w-max max-w-48 w-[98%] m-4 transition-all ease-in-out duration-300">
          <p className="text-gray-500">Main Navigation</p>
          <a className="text-xl text-blue-600" href="tel:+23481062344890">
            +234 810 6234 4890
          </a>
        </section>
        <section className="flex-grow flex flex-col justify-end h-max rounded-md md:w-max max-w-48 w-[98%] m-4 transition-all ease-in-out duration-300">
          <p className="text-gray-500 text-sm">Information Center</p>
          <a
            className="text-xl text-blue-600"
            href="mailto:cyber@silexsecure.com"
          >
            cyber@silexsecure.com
          </a>
        </section>
      </div>
      <p className="w-[90%] mx-auto my-2 text-gray-400 text-xs font-medium text-center">
        Copyright &copy; 2023 Axpos By Jegtheme. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
