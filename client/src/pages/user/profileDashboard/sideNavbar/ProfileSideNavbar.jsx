import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineWallet,
  AiOutlineLogout,
} from "react-icons/ai";
import { TiTicket } from "react-icons/ti";
import { MdTrackChanges } from "react-icons/md";
import { BiUser, BiHistory } from "react-icons/bi";
import { GiMailbox } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { logout } from "../../../../redux/actions/userActions";
const ProfileSideNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className='"w-1/5 bg-white border shadow-lg p-10   h-fit shrink-0 rounded hidden lg:block '>
      <NavLink className="side-nav-link-sp flex items-center gap-3   text-violet-500 font-bold" to="/dashboard/">
        <RiDashboardLine />
        Dashboard
      </NavLink>
      <NavLink className="side-nav-link-sp flex items-center gap-3 py-2  text-violet-500 font-bold" to="profile">
        <BiUser />
        Account Details
      </NavLink>
      <NavLink className="side-nav-link-sp flex items-center gap-3 text-violet-500 font-bold" to="order-history">
        <BiHistory />
        Order History
      </NavLink>
      <NavLink className="side-nav-link-sp flex items-center gap-3 py-2 text-violet-500 font-bold" to="wishlist">
        <AiOutlineHeart />
        Wishlist
      </NavLink>
      <NavLink className="side-nav-link-sp flex items-center gap-3  text-violet-500 font-bold" to="address">
        <GiMailbox />
        Addresses
      </NavLink>
      <NavLink className="side-nav-link-sp flex items-center gap-3 py-2 text-violet-500 font-bold" to="wallet">
        <AiOutlineWallet />
        Wallet
      </NavLink>
      <NavLink className="side-nav-link-sp flex items-center gap-3  text-violet-500 font-bold" to="coupons">
        <TiTicket />
        Find Coupons
      </NavLink>
      <NavLink className="sside-nav-link-sp flex items-center gap-3 py-2 text-violet-500 font-bold" to="settings">
        <FiSettings />
        Settings
      </NavLink>
      <button className="side-nav-link-sp flex items-center gap-3 justify-center text-violet-500 font-bold" onClick={handleLogout}>
        <AiOutlineLogout />
        Logout
      </button>
    </div>
  );
};

export default ProfileSideNavbar