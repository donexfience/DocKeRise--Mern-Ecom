import React from 'react';
import SocialMedia from './SocialMedia';
import { FiMail } from "react-icons/fi";
import Logo from '../assets/LOGO.png';
import QR_code_for_mobile_English_Wikipedia from '../assets/QR.svg'
import GOOGLEPLAY from '../assets/GOOGLEPLAY.jpg'

const Footer = () => {
  return (
<div className="bg-color-rev lg text-white lg:flex pt-20 lg:pt-0 flex flex-col">
  <div className="flex flex-row bg-gradient-to-r from-fuchsia-500 to-cyan-500 lg:w-full px-5 py-10 lg:p-10 ">
    <div className="flex flex-col mr-10">
      <h1 className="text-xl lg:text-3xl font-bold mb-5">
        <span className="text-gray-500">GamersLoot </span>
        Stay In Connection With Us
      </h1>
      <div className="mb-4">
        <label htmlFor="email" className="text-black mb-2">Email</label>
        <div className="flex items-center gap-3 border border-gray-400 p-2 rounded-lg">
          <FiMail />
          <input type="email" name="email" placeholder="GamersLOot@email.com" className="bg-transparent outline-none" />
        </div>
      </div>
      <div>
        <label htmlFor="username" className="text-black mb-2">Username</label>
        <div className="flex items-center gap-3 border border-gray-400 p-2 rounded-lg">
          <FiMail />
          <input type="text" name="Username" placeholder="Donex FIence" className="bg-transparent outline-none" />
        </div>
        <button className="bg-violet-500 text-white py-2 px-4 mt-5 rounded-md hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-400">Send Request</button>
      </div>
    </div>
      <p className="mt-8 text-sm text-gray-500"></p>
    <div className="lg:w-2/3 p-10 lg:my-20">
    <div className="lg:flex mb-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-20 lg:w-3/4 mb-5">
        <ul>
          <li className="navbar-p text-black font-bold">Info</li>
          <li className="navbar-li">Company</li>
          <li className="navbar-li">Products</li>
          <li className="navbar-li">Engineering</li>
        </ul>
        <ul>
          <li className="navbar-p mt-4 lg:mt-0 font-bold text-black">About Us</li>
          <li className="navbar-li">Gallery</li>
          <li className="navbar-li">Technologies</li>
          <li className="navbar-li">Contacts</li>
        </ul>
        <ul className='mr-6 font-bold'>
          <li className="navbar-p  text-black">Contact Us</li>
          <li className="navbar-li">+91 9072082624</li>
          <li className="navbar-li">help@Gamersloot.com</li>
          <li className="navbar-limt-4">Calicut,Kerla,India</li>
        </ul>
      </div>
      <ul className='ml-12 font-bold' >
          <li className="navbar-p  text-black">Download</li>
          <li className="navbar-li mt-4"><img className='w-12' src={QR_code_for_mobile_English_Wikipedia}/></li>
          <li className="navbar-li mt-4"><img className='w-12' src={GOOGLEPLAY}/></li>
          <li className="navbar-li mt-4"><SocialMedia /></li>
        
        </ul>
        <div className="lg:w-1/4">
        <img src={Logo} alt="ex.iphones." className="w-1/3 lg:mx-auto" />
      </div>
    </div>
    <div className="flex justify-between items-center text-black">
      
    <div className='font-bold text-white px-10 ml-12'>@GamersLOot 2023</div>
    </div>
  </div>

  </div>

</div>

  );
}

export default Footer;
