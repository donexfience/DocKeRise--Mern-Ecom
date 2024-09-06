import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../../../redux/actions/userActions';
import GamersLootLogo from '../../../components/GamersLootLogo';
import {RiDashboardLine} from 'react-icons/ri'
import { FiBox, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { HiOutlineTicket } from "react-icons/hi";
import { BsCardChecklist, BsCreditCard } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { FaUsersCog, FaUsers } from "react-icons/fa";
import { FaUser } from 'react-icons/fa';

const SIdeNavbar = () => {
    const {user}=useSelector((state)=>state.user)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(logout());
        navigate('/');
    }
  return (
    <div className='mr-12'>
    <div className='w-7 flex cursor-pointer opacity-70 hover:opacity-100 mr-12'>
        <GamersLootLogo/>
    </div>
    <div className='text-gray-600 font-semibold mt-5'>
        <p className='side-nav-sub-title mb-3 text-grey-600 text-black font-bold'>Menu</p>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-3' to='/admin/'>
        <RiDashboardLine/>
        Dashboard
        </NavLink>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-6' to='product'>
        <FiBox/>
        Product
        </NavLink>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-4' to='categories'>
        <ImStack/>
        Category
        </NavLink>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-8' to='orders'>
        <BsCardChecklist/>
        Orders
        </NavLink>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-6' to='coupons'>
        <HiOutlineTicket/>
        Coupon
        </NavLink>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-8' to='/admin/'>
        <AiOutlineTags/>
        Banner 
        </NavLink>
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-3' to='/admin/'>
        <BsCreditCard/>
        Payments
        </NavLink>
        <p className='text-grey-600 mt-4 mb-4 font-bold text-black'>User Management</p>
        {user&& user.role==='superAdmin' &&(<NavLink className='side-nav-link-sp text-white flex items-center mr-7 mb-4 gap-3 justify-center hover:text-black' to='/adming'>
        <FaUser/>
          Manage Admins
        </NavLink>)}
        <NavLink className='side-nav-link-sp text-white flex items-center mb-4 gap-2 justify-center hover:text-black hover:bg-white rounded py-3 px-2 mr-3' to='customers'>
          <FaUser/>
          Customers
          </NavLink> 
          <p className="text-grey-600 mt- text-black font-bold">Other</p>
        <NavLink className="side-nav-link-sp text-white flex items-center mt-4 mr-10 mb-4 gap-3 justify-center hover:text-black" to="settings">
          <FiSettings />
          Settings
        </NavLink>
        <NavLink className="side-nav-link-sp text-white flex items-center mt-4 mr-16 mb-4 gap-3 justify-center hover:text-black" to="help">
          <FiHelpCircle />
          Help
        </NavLink>
        <button
          className="side-nav-link-sp text-white flex items-center mt-4 mr-12 mb-4 gap-3 justify-center hover:text-black"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button>
    </div>

    </div>
  )
}

export default SIdeNavbar