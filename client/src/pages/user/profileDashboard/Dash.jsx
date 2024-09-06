import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRocket } from "react-icons/fa";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config } from "../../../Common/configurations";
import TotalOrders from "../../../assets/TotalOrders.mp4";
import Pending from "../../../assets/Pending.mp4";
import ProfileImage from "../../../components/ProfileImage";
import GamersLootLogo from "../../../components/GamersLootLogo";
import { AiOutlineArrowDown } from "react-icons/ai";
import toast from "react-hot-toast";
const Dash = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user, "-[[[[[[[[]]]]]]]]]]]");
  const [orderDatas, setOrderDatas] = useState({});
  const loadOrderCounts = async () => {
    try {
      const { data } = await axios.get(`${URL}/user/order-count`, config);
      if (data) {
        setOrderDatas(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadOrderCounts();
  }, []);
  console.log(orderDatas, "---------------------");

  const handleCopyToClipboard = () => {
    const referralLink = `http://localhost:5173/signup?referralCode=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      toast.success("Referral link copied to clipboard!");
    });
  };
  return (
    <div className="bg-white shadow-lg min-h-screen lg:px-3">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-10">
        <div className="mt-5 bg-blue-100 w-full p-4 flex gap-3 items-center rounded">
          <div className="p-10 w-52 h-32 bg-white text-blue-400 text-lg relative">
            {/* Video Player */}
            <video
              autoPlay
              loop
              muted
              className="w-full h-full max-w-lg max-h-full absolute inset-0"
            >
              <source src={TotalOrders} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="  text-violet-600 font-bold text-lg">
                {orderDatas.totalOrders || 0}
              </p>
              <p className="text-sm font-bold text-black">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-orange-100 w-full p-4 flex gap-3 items-center rounded">
          <div className=" p-10 w-52 h-32 bg-white text-blue-400 text-lg relative">
            {/* Video Player */}
            <video
              autoPlay
              loop
              muted
              className="w-full h-full max-w-lg max-h-full absolute inset-0"
            >
              <source src={Pending} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className=" text-violet-600 font-bold text-lg">
                {orderDatas.pendingOrders || 0}
              </p>
              <p className="text-sm font-bold text-black">
                Total Pending Orders
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-red-100 w-full p-4 flex gap-3 items-center rounded">
          <div className=" p-10 w-52 h-32 bg-white text-blue-400 text-lg relative">
            {/* Video Player */}
            <video
              autoPlay
              loop
              muted
              className="w-full h-full max-w-lg max-h-full absolute inset-0"
            >
              <source src={TotalOrders} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-bold text-violet-600 text-lg">
                {orderDatas.averagePurchasePercentage || 0}
              </p>
              <p className="text-sm font-bold text-black">
                Purchase Percentage
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-orange-100 w-full p-4 flex gap-3 items-center rounded">
          <div className=" p-10 w-52 h-32 bg-white text-blue-400 text-lg relative">
            {/* Video Player */}
            <video
              autoPlay
              loop
              muted
              className="w-full h-full max-w-lg max-h-full absolute inset-0"
            >
              <source src={TotalOrders} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-violet-600 font-bold text-lg">
                {orderDatas.completedOrders || 0}
              </p>
              <p className="text-sm font-bold text-black">Completed Orders</p>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-orange-100 w-full p-3 flex gap-3 items-center rounded">
          <div className="w-52 h-32 bg-white text-blue-400 text-lg relative">
            {/* Video Player */}
            <video
              autoPlay
              loop
              muted
              className="w-full h-full max-w-lg max-h-full absolute inset-0"
            >
              <source src={TotalOrders} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-violet-600 font-bold text-lg">
                {orderDatas.totalAddresses || 0}
              </p>
              <p className="text-sm font-bold text-black">Saved Addresses</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full border mt-5 shadow-lg rounded">
        <h1 className="text-lg px-5 py-3 font-semibold border-b border-violet-500">
          Welcome to GameLoot
        </h1>
        <div className="p-5">
          <p className="text-gray-500">
            Welcome to GameLoot, your one-stop destination for all your gaming
            needs! Whether you're a casual gamer or a hardcore enthusiast, we've
            got you covered with the latest and greatest in gaming accessories,
            consoles, and more.
          </p>
          <GamersLootLogo />
        </div>
        {user && (
          <div>
            <h1 className="text-lg px-5 py-3 font-semibold border-b border-violet-500">
              Account Info
            </h1>
            <div className="p-5">
              <div className="flex gap-2 items-center pb-3">
                <div className="h-12 w-12 shrink-0">
                  <ProfileImage user={user} />
                </div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <p className="font-semibold">
                Email: <span className="text-gray-500">{user.email}</span>
              </p>
              <p className="font-semibold">
                Phone No:{" "}
                <span className="text-gray-500">{user.phoneNumber}</span>
              </p>
              <Link to="profile">
                <button className="text-blue-500  font-bold my-2">
                  Edit Account{" "}
                </button>
              </Link>
              <Link to="order-history">
                <button className="text-blue-500  font-bold my-2">
                  {" "}
                  | Order History{" "}
                </button>
              </Link>
              <Link to="address">
                <button className="text-blue-500  font-bold my-2">
                  {" "}
                  | Edit Address
                </button>
              </Link>
            </div>
            <div className="p-5 border-t border-violet-500">
              <h1 className="text-lg font-semibold mb-3">Security Messages</h1>
              <p className="text-gray-500">
                Your account security is important to us. We recommend you to
                enable two-factor authentication for additional security.
              </p>
              <p className="text-gray-500 mt-3">
                Remember to use a strong and unique password to protect your
                account.
              </p>
            </div>
            <div className="bg-white shadow-lg min-h-screen lg:px-3 w-full">
              <div className="flex flex-col lg:flex-row justify-between w-full gap-10">
                {/* Your other code */}
                <div className="p-5 border-t border-violet-500 w-full">
                  <h1 className="text-lg font-semibold mb-3">
                    Your Referral code
                  </h1>
                  <p className="text-gray-500">
                    Refer other people by using your referral link.
                    <p className="text-blue-500 font-bold pt-3 flex items-center gap-4">
                      Link below <AiOutlineArrowDown />
                    </p>
                  </p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={`http://localhost:5173/signup?referralCode=${user.referralCode}`}
                      className="form-input w-full rounded-md mr-2"
                      readOnly
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={handleCopyToClipboard}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dash;
