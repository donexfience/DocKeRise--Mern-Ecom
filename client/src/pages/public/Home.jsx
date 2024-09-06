import React from "react";
import { BiSearch } from "react-icons/bi";
import home3 from "../../assets/home3.png";
import NewKeyboard from "../../components/Homecomponents/NewKeyboard";
import CountdownTimer from "../../components/CountdownTimer";
import SpecialCategory from "../../components/Homecomponents/SpecialCategory";
import BestSellingProducts from "../../components/Homecomponents/BestSellingProducts";
import monitor from "../../assets/monitor.jpg";
import Services from "../../assets/Services.png";
import ImageSlider from "../../components/Homecomponents/ImageSlider";
import SendMail from "../../assets/SendMail.jpg";
import SearchBar from "../../components/SearchBar";
const Home = () => {
  return (
    <div className="">
      {/* Landing Session */}
      <div className="lg:h-screen bg-color lg:flex lg:items-start overflow-clip bg-black pt-32 font-semibold">
        <div className="text-white ml-4 p-6 h-full  w-[90%] text-nowrap ">
          <ul className="flex flex-col gap-3">
            <li>Gaming Headsets</li>
            <li>Gaming Keyboards</li>
            <li>Gaming Chairs</li>
            <li>Gaming Mouses</li>
            <li>Gaming Monitor</li>
            <li>Gaming Pc components</li>
            <li>GamePad and Joystick</li>
            <li>Gamepad and Joystick</li>
            <li>Gaming laptop</li>
            <li>Games store</li>
          </ul>
        </div>

        {/* Search and content div */}
        <div className="flex-shrink-0 text-white lg:pl-34 ml-5 lg:w-[75%] mr-12">
          <div className="flex justify-between rounded-2xl py-2 pl-2 lg:pl-5 pr-2 bg-white font-semibold">
            <div className="flex items-center lg:gap-3">
              <BiSearch className="text-2xl text-blue-600" />
              <input
                type="text"
                placeholder="Find the best product"
                className="text-black outline-none w-full"
              />
            </div>
            <button className="bg-black py-3 px-8 rounded-md">Search</button>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 mt-12">
            PlayStation®5
          </h1>
          <p className="font-bold text-gray-500  text-sm lg:text-lg mb-10 lg:mb-3">
            Find the best, reliable and affordable Gaming products here. We
            focus on the product quality. Here you can find all the products
            apple ever made. Even the products officially stopped selling. Just
            visit our services and share yours feedbacks So why you are waiting?
            Just order now!
          </p>
          <img
            src={home3}
            className="lg:w-[1200px] lg:-ml-12 lg:mt-16"
            alt="Bg Image"
          />
        </div>
      </div>
      <div className="bg-black">
        <div className="flex gap-3 ">
          <button className="ml-7  bg-violet-600  text-violet-600">ds</button>
          <h2 className="text-2xl font-semibold text-orange-500">Today's </h2>
        </div>
        <div className="text-white flex gap-3 text-3xl mt-5 ml-7">
          <h2>Flash sales</h2>
          <CountdownTimer endTime={new Date("2024-04-17T12:00:00")} />
        </div>
        <NewKeyboard />
        <SpecialCategory />
        <div className="bg-black">
          <ImageSlider />
          <div className="flex gap-3 mt-5 ">
            <button className="ml-7  bg-violet-600  text-violet-600">ds</button>
            <h2 className="text-2xl font-semibold text-orange-500">
              Best Selling Products{" "}
            </h2>
          </div>
          <BestSellingProducts />
          <div className="bg-black text-white text-center ">
            <h1 className="text-5xl font-bold pt-32">GameresLoot</h1>
            <p className="text-sm lg:text-xl mt-8 font-bold">Gaming Monitors</p>

            <div className="flex justify-center mt-7 mb-12 items-center gap-5">
              <button className="ml-45 bg-violet-500 px-10 rounded py-3 ">
                Buy
              </button>
              <p className="text-xl font-bold text-blue-500">Learn more</p>
            </div>
            <img src={monitor} alt="" className="mx-auto" />
          </div>
          <div className="flex justify-evenly gap-3">
            <div className="flex-col ">
              <img className="ml-16 mb-4" src={Services} />
              <h2 className="text-white text-xl font-bold ">
                Free and Fast delievery
              </h2>
              <p className="ml-14 mt-5 mb-4 font-semibold text-white">
                free delievery
              </p>
            </div>
            <div className="flex-col ">
              <img className="ml-16 mb-4" src={Services} />
              <h2 className="text-white text-xl font-bold ">
                Free and Fast delievery
              </h2>
              <p className="ml-14 mt-5 mb-4 font-semibold text-white">
                free delievery
              </p>
            </div>
            <div className="flex-col ">
              <img className="ml-16 mb-4" src={Services} />
              <h2 className="text-white text-xl font-bold ">
                Free and Fast delievery
              </h2>
              <p className="ml-14 mt-5 mb-4 font-semibold text-white">
                free delievery
              </p>
            </div>
          </div>
          <div className="bg-black py-20">
            <div className="lg:flex lg:items-center mx-10 lg:mx-20 bg-white px-5 lg:px-24 py-10 rounded-3xl shadow-lg">
              <div className="lg:w-1/2">
                <h1 className="text-xl lg:text-3xl font-bold my-2">
                  Subscribe To GamersLoot
                </h1>
                <p className="text-sm font-bold my-2">
                  Get <span className="text-blue-500"> weekly </span>
                  <span className="text-green-500"> updates </span>
                  <span className="text-red-500"> about </span>
                  the <span className="text-yellow-500"> latest </span>
                  <span className="text-purple-500">Gaming </span>
                  <span className="text-pink-500"> Accessories</span>.
                </p>
                <SearchBar />
                <button className="mt-4 bg-violet-500 py-2 px-2 rounded-lg shadow-md shadow-black  text-white font-bold">Subscribe</button>
              </div>
              <div className="lg:w-1/2">
                <img src={SendMail} alt="Newsletter Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
