import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "time-loom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import download from "../assets/download.json";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineWallet,
} from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { GiHamburgerMenu, GiMailbox } from "react-icons/gi";
import { BiHistory, BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdTrackChanges } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import GamersLootLogo from "./GamersLootLogo";
import OutsideTouchCloseComponent from "./OutSideTouchCloseComponent";
import { useLocation } from "react-router-dom";
import { BsArrowDown } from "react-icons/bs";

const Navbar = () => {
  //navbar colour changing
  const location = useLocation();
  const [navbarColor, setNavbarColor] = useState("transparent");

  useEffect(() => {
    // // Change navbar color based on the current route
    // if (location.pathname === "/" && user) {
    //   setNavbarColor("text-black"); // Change to the desired color
    // }
    // if (location.pathname === "/") {
    //   setNavbarColor("text-black"); // Change to the desired color
    // }
    // if (location.pathname === "/login" && !user) {
    //   setNavbarColor("text-black"); // Change to the desired color
    // }
    // if (location.pathname === "/signup") {
    //   setNavbarColor("text-black"); // Change to the desired color
    // }
    // if (location.pathname === "*") {
    //   setNavbarColor("text-black");
    // } else if (location.pathname.includes("/product/")) {
    //   setNavbarColor("text-black"); // Change to the desired color for paths containing "/product/"
    // } else {
    //   setNavbarColor("text-white"); // Change to the default color
    // }
    if (location.pathname === "/") {
      setNavbarColor("text-white");
    }
    if (location.pathname === "/login") {
      setNavbarColor('text-black');
    }
  }, [location.pathname]);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = debounce(() => {
    setDropDown(!dropDown);
  }, 100);

  const handleLogout = () => {
    toggleDropDown();
    dispatch(logout());
    navigate("/");
  };

  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const toggleSideNavbar = () => {
    setShowSideNavbar(!showSideNavbar);
  };

  return (
    <>
      <nav
        className={`flex z-10 absolute items-center justify-between py-5 px-5 lg:px-40 font-bold ${navbarColor}  w-full`}
      >
        <div className="flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100">
          <GamersLootLogo />
        </div>
        <div className="flex justify-center flex-grow">
          {!user && (
            <div className="flex justify-evenly flex-wrap sm:flex-nowrap">
              <NavLink
                className="hover:text-blue-400 px-5 py-1 hidden sm:inline"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="hover:text-blue-400 px-5 py-1 hidden sm:inline"
                to="/contact"
              >
                Contact
              </NavLink>
              <NavLink
                className="hover:text-blue-400 px-5 py-1 hidden sm:inline"
                to="/about"
              >
                About
              </NavLink>
              <NavLink className="hover:text-blue-400 py-1 px-3" to="/login">
                Login
              </NavLink>
              <NavLink className="hover:text-blue-400 py-1 px-3" to="/signup">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex sm:gap-6 items-center justify-center relative">
          {user && (
            <>
              <NavLink to="/" className="text-black hover:text-blue-400 p-2">
                <AiOutlineHome className="text-xl" />
              </NavLink>
              <NavLink
                to="/cart"
                className="text-black hover:text-blue-400 p-2"
              >
                <AiOutlineShoppingCart className="text-xl" />
              </NavLink>
              <NavLink
                to="dashboard/wishlist"
                className="text-black hover:text-blue-400 p-2"
              >
                <AiOutlineHeart className="text-xl" />
              </NavLink>
              <button
                className="hover:text-blue-400 sm:hidden"
                onClick={toggleSideNavbar}
              >
                <GiHamburgerMenu className="text-xl" />
              </button>
              <button
                className="text-black hover:text-blue-400 hidden sm:block"
                onClick={toggleDropDown}
              >
                <AiOutlineUser className="text-xl" />
              </button>

              {dropDown && (
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center w-full px-4 py-2 border border-indigo-500 rounded-md shadow-sm bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onClick={toggleDropDown}
                  >
                    Choose one
                  </button>

                  {dropDown && (
                    <OutsideTouchCloseComponent
                      toggleVisibility={toggleDropDown}
                      style="absolute top-10 right-2 p-5 font-normal w-44 bg-white rounded-lg shadow-2xl"
                      showSideNavbar={showSideNavbar}
                    >
                      <NavLink
                        to="/dashboard/"
                        className="navbar-drop-ul mb-3 flex items-center text-indigo-500 font-bold"
                        onClick={toggleDropDown}
                      >
                        <RiDashboardLine className="text-xl mr-2 text-indigo-500 font-bold" />{" "}
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/dashboard/profile"
                        className="navbar-drop-ul mb-3 flex items-center text-indigo-500 font-bold"
                        onClick={toggleDropDown}
                      >
                        <AiOutlineUser className="text-xl mr-2 text-indigo-500 font-bold" />{" "}
                        Profile
                      </NavLink>
                      <NavLink
                        to="/dashboard/order-history"
                        className="navbar-drop-ul mb-3 flex items-center text-indigo-500 font-bold"
                        onClick={toggleDropDown}
                      >
                        <AiOutlineHistory className="text-xl mr-2 text-indigo-500 font-bold" />{" "}
                        Order History
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="navbar-drop-ul flex items-center w-full text-indigo-500 font-bold"
                      >
                        <AiOutlineLogout className="text-xl text-indigo-500 mr-2" />
                        Logout
                      </button>
                    </OutsideTouchCloseComponent>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      {/* Mobile Screen side bar */}
      {showSideNavbar && (
        <div className="side-navbar-admin fixed z-20 h-screen w-fit bg-gray-100 px-5 py-3 flex-shrink-0 border-r border-r-gray-300 shadow-lg pt-5 sm:hidden">
          <div className="flex justify-center items-center cursor-pointer opacity-70 hover:opacity-100">
            <GamersLootLogo />
          </div>
          <div className="text-gray-600 font-semibold mt-5">
            <NavLink className="side-nav-link-sp" to="/">
              <RiDashboardLine />
              Dashboard
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/">
              <BiUser />
              Account Details
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/">
              <BiHistory />
              Order History
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/track-order">
              <MdTrackChanges />
              Track Order
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/wishlist">
              <AiOutlineHeart />
              Wishlist
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/addresses">
              <GiMailbox />
              Addresses
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/wallet">
              <AiOutlineWallet />
              Wallet
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/find-coupons">
              <TiTicket />
              Find Coupons
            </NavLink>

            <button
              className="side-nav-link-sp cursor-pointer w-full"
              onClick={handleLogout}
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
