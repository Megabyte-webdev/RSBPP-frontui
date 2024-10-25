import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/new-logo.png";
import { useState, useEffect, useContext } from "react";
import { IoIosMenu, IoIosClose } from 'react-icons/io'
import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialTwitter } from 'react-icons/ti'
import { FaShoppingCart } from "react-icons/fa";
import { ResourceContext } from "../../context/ResourceContext";
import { UserContext } from "../../context/AuthContext";
import { cartsTotalFunction } from '../utils/getApi';
const Nav = () => {
  const navigate = useNavigate();

  const [guestCart, setGuestCart] = useState(0)
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState({});
  const {
    cartStore,
    getAllCarts,
setCartStore
  } = useContext(ResourceContext)
  const {userCredentials} = useContext(UserContext);

    const [error, setError] = useState('');
    const [currentTotal, setCurrentTotal] = useState('');
    const token = userCredentials?.token;
    const role = userCredentials?.user?.role;

        // Refetch cart data on location change
        useEffect(() => {
            if (userCredentials) {
                cartsTotalFunction(token, userCredentials.user.id, setError, setCurrentTotal, (newCart) => {
                    setCartStore(newCart);
                });
            }
        }, [userCredentials]);



  useEffect(() => {
    setGuestCart(cartStore?.data ? cartStore?.data?.length : 0)
    console.log(cartStore)
  }, [cartStore])

  const handleDropdown = (event, name) => {
    
    setDropdown((prev) => {
      const newDropdown = {}
      Object.keys(prev).forEach(key => (newDropdown[key] = false));
      newDropdown[name] = !prev[name];
      return newDropdown;
    });

  }
  // Function to close all dropdowns
  const handleMouseLeaveDropdown = () => {
    setDropdown({}); // Close all dropdowns
  };
  return (
    <div>
      {/* top cta */}
      <div className='font-[Ripple-Bold] text-xs md:text-[16px] text-white gap-2 py-3 px-[4%] lg:px-[5%] bg-[#8B0002] px flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
        <div className='flex gap-x-3'>
          <a className='no-underline text-white font-bold' href="tel:+31(0)10 307 2137">+31(0)10 307 2137</a>
          <a className='no-underline text-white font-bold' href="mailto:info@rsbpp.nl">info@rsbpp.nl</a>
        </div>
        <div className='flex gap-3 text-white'>
          <a href='https://www.facebook.com/profile.php?id=61558624776513&_rdc=1&_rdr' className='text-inherit hover:text-blue-800'><TiSocialFacebook size='20' /></a>
          <a className='text-inherit hover:text-blue-600' href='https://twitter.com/'><TiSocialTwitter size='20' /></a>
          <a className='text-inherit hover:text-[teal]' href='https://www.linkedin.com/company/rottedam-school-of-business-public-policy/about/?viewAsMember=true'><TiSocialLinkedin size='20' /></a>
          <a className='text-inherit hover:text-red-600' href='https://instagram.com/'><TiSocialInstagram size='20' /></a>
        </div>
      </div>
      {/* main nav */}
      <div className="uppercase px-[4%] lg:px-[5%] flex items-center justify-between text-sm py-4">
        <img className="w-32 md:w-60 cursor-pointer mr-auto" src={logo} alt="logo" />
        <ul className="text-[14px] text-black hidden md:flex md:flex-wrap items-center md:justify-center gap-x-2 gap-y-2">
          <a href='https://rsbpp.nl/' className="px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
            <p>HOME</p>
          </a>
          <li onClick={(e) => handleDropdown(e, 'aboutUs')} className="cursor-pointer relative px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
            <p className="">ABOUT US +</p>
            {
              dropdown.aboutUs &&
              <ul onMouseLeave={handleMouseLeaveDropdown} onClick={()=>setMenu(false)} className="z-[100] p-2 text-[13px] font-semibold absolute top-full mt-3 md:min-w-60 bg-gray-200 text-black w-full transition-all duration-500">
                <li className='flex'><a href='https://rsbpp.nl/index.php/about-us/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Who We Are</a></li>
                <li className='flex'><a href='https://rsbpp.nl/index.php/mission-statement/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Mission/Vision</a></li>
                <li className='flex'><a href='/online-programmes/#' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Our Leadership</a></li>
                <li className='flex'><a href='/https://rsbpp.nl/index.php/advisory-board/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Advisory Board</a></li>
                <li className='flex'><a href='/online-programmes/#' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Management Board</a></li>
                <li className='flex'><a href='/https://rsbpp.nl/index.php/contact-us/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Contact Us</a></li>
              </ul>
            }
          </li>
          <li onClick={(e) => handleDropdown(e, 'programmes')} className="group cursor-pointer relative px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
            <p> PROGRAMMES +</p>
            {
              dropdown.programmes &&
              <ul onMouseLeave={handleMouseLeaveDropdown} className="z-[100] p-2 text-[13px] font-semibold absolute top-full mt-3 md:min-w-60 bg-gray-200 text-black w-full">
                <li className='flex'><a href='https://rsbpp.nl/index.php/executive-education-programmes/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Executive Education</a></li>
                <li className='flex'><NavLink to='/online-programmes' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Online Programmes</NavLink></li>
                <li className='flex'><NavLink to='/digiknowh' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">DigiKnowH</NavLink></li>
              </ul>
            }
          </li>
          <li onClick={(e) => handleDropdown(e, 'faculties')} className="cursor-pointer relative px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
            <p>FACULTIES +</p>
            {
              dropdown.faculties &&
              <ul onMouseLeave={handleMouseLeaveDropdown} className="z-[100] p-2 text-[13px] font-semibold absolute top-full mt-3 md:min-w-60 bg-gray-200 text-black w-full">
                <li className='flex'><a href='https://rsbpp.nl/index.php/faculty-of-business-communication-and-finance/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Faculty of Business, Communication and Finance</a></li>
                <li className='flex'><a href='https://rsbpp.nl/index.php/faculty-of-good-governance/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Faculty of Good Governance, and Public Policy</a></li>
              </ul>
            }
          </li>
          <a className="group px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" href="https:/rsbpp.nl/#">
            <p>NEWS & EVENTS</p>
          </a>
          <a className="px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" href="https:/rsbpp.nl/#">
            <p>SUPPORT AND GUIDANCE</p>
          </a>
          <li onClick={(e) => handleDropdown(e, 'download')} className="cursor-pointer relative px-[9px] hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
            <p>DOWNLOADS +</p>
            {
              dropdown.download &&
              <ul onMouseLeave={handleMouseLeaveDropdown} className="z-[100] p-2 text-[13px] font-semibold absolute top-full left-0 mt-3 md:min-w-60 bg-gray-200 text-black w-full">
                <li className='flex'><a href='https://rsbpp.nl/wp-content/uploads/2024/06/RSBPP-BROCHURE-24-25-V5-v2.1_compressed.pdf' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">2024 Course Brochure</a></li>
              </ul>
            }
          </li>

        </ul>

        <p onClick={() => { navigate('/carts'); {!userCredentials && localStorage.setItem("comingFrom", JSON.stringify({ user: "guest" }))} }} className="ml-2 mr-2 relative cursor-pointer flex item-center"><FaShoppingCart size="24" /> <span className="absolute top-[-13px] right-0 w-max h-max px-1 rounded-full bg-red-700 text-white text-xs">{guestCart}</span></p>

        <div className="md:hidden bg-[#8B0002] py-2 px-3 text-white rounded-md cursor-pointer" onClick={() => setMenu(!menu)}>
          {
            menu !== true ? <IoIosMenu size="24" /> : <IoIosClose size="24" />
          }
        </div>

      </div>
      {/* Side nav */}
      <div onClick={(event) => { if (!event.target.closest('sideNav') && event.target === document.querySelector('.sideNav-container')) { setMenu(false) } }} className={`sideNav-container ${menu === true ? 'opacity-1 left-0' : 'opacity-0 left-[-999px]'} md:hidden fixed z-[100] text-[13px] font-semibold top-0 bottom-0 w-screen h-full bg-[rgba(0,0,0,.8)] transition-all duration-500`}>
        <div className='bg-white w-full md:w-96 h-full pt-12'>
          <div className="flex justify-between items-center p-3">
            <img className="w-32 md:w-60 cursor-pointer" src={logo} alt="logo" />
            <p onClick={() => { navigate('/carts'); {!userCredentials && localStorage.setItem("comingFrom", JSON.stringify({ user: "guest" }))} }} className="ml-auto mr-2 relative cursor-pointer"><FaShoppingCart size="24" /> <span className="absolute top-[-10px] right-0 w-max h-max px-1 rounded-full bg-red-700 text-white text-xs">{guestCart}</span></p>

            <div className="md:hidden bg-[#8B0002] py-2 px-3 text-white rounded-md cursor-pointer" onClick={() => setMenu(!menu)}>
              {
                menu !== true ? <IoIosMenu size="24" /> : <IoIosClose size="24" />
              }
            </div>

          </div>
          <ul className="py-5 px-3 text-[15px] text-black flex flex-col gap-y-2">
            <NavLink onClick={() => setMenu(false)} className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" to="https://rsbpp.nl">
              <p>HOME</p>
            </NavLink>
            <li onClick={(e) => handleDropdown(e, 'aboutUs')} className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
              <p className="">ABOUT US +</p>
              {
                dropdown.aboutUs &&
                <ul className="p-2 text-[13px] font-semibold mt-3 bg-gray-200 text-black">
                  <li className='flex'><a href='https://rsbpp.nl/index.php/about-us/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Who We Are</a></li>
                  <li className='flex'><a href='https://rsbpp.nl/index.php/mission-statement/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Mission/Vision</a></li>
                  <li className='flex'><NavLink onClick={() => setMenu(false)} to='/online-programmes/#' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Our Leadership</NavLink></li>
                  <li className='flex'><a href='/https://rsbpp.nl/index.php/advisory-board/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Advisory Board</a></li>
                  <li className='flex'><a href='/online-programmes/#' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Management Board</a></li>
                  <li className='flex'><a href='/https://rsbpp.nl/index.php/contact-us/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Contact Us</a></li>
                </ul>
              }
            </li>
            <li onClick={(e) => handleDropdown(e, 'programmes')} className="group hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
              <p> PROGRAMMES +</p>
              {
                dropdown.programmes &&
                <ul onClick={() => setMenu(false)} className="p-2 text-[13px] font-semibold mt-3 bg-gray-200 text-black w-full">
                  <li className='flex'> <a to='https://rsbpp.nl/index.php/executive-education-programmes/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Executive Education</a></li>
                  <li className='flex'><NavLink to='/online-programmes' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Online Programmes</NavLink></li>
                  <li className='flex'><NavLink to='/digiknowh' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">DigiKnowH</NavLink></li>
                </ul>
              }
            </li>
            <li onClick={(e) => handleDropdown(e, 'faculties')} className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
              <p>FACULTIES +</p>
              {
                dropdown.faculties &&
                <ul onClick={() => setMenu(false)} className="p-2 text-[13px] font-semibold mt-3 bg-gray-200 text-black w-full">
                  <li className='flex'><a href='https://rsbpp.nl/index.php/faculty-of-business-communication-and-finance/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Faculty of Business, Communication and Finance</a></li>
                  <li className='flex'><a href='https://rsbpp.nl/index.php/faculty-of-good-governance/' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">Faculty of Good Governance, and Public Policy</a></li>
                </ul>
              }
            </li>
            <a className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" href="https://rsbpp.nl/#">
              <p>NEWS&EVENTS</p>
            </a>
            <a className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit" href="https://rsbpp.nl/#">
              <p>SUPPORT AND GUIDANCE</p>
            </a>
            <li onClick={(e) => handleDropdown(e, 'download')} className="hover:text-[#8B0002] [&.active]:text-[#8B0002] no-underline text-inherit">
              <p>DOWNLOADS +</p>
              {
                dropdown.download &&
                <ul onClick={() => setMenu(false)} className="z-[100] p-2 text-[13px] font-semibold absolute top-full left-0 mt-3 md:min-w-60 bg-gray-200 text-black w-full">
                  <li className='py-2 px-4 hover:bg-white'><a href='https://rsbpp.nl/wp-content/uploads/2024/06/RSBPP-BROCHURE-24-25-V5-v2.1_compressed.pdf' className="hover:bg-white w-full py-2 px-4 no-underline text-inherit">2024 Course Brochure</a></li>
                </ul>
              }
            </li>

          </ul>


        </div>
      </div>
    </div>
  );
};

export default Nav;
