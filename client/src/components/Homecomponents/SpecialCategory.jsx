import React, { useEffect, useState } from "react";
import { URL, commonRequests } from "../../Common/api";
import { appJson } from "../../Common/configurations";
import Banner from "../../../public/Banner.png";
import { FaLaptop, FaGamepad, FaHeadphones, FaMobileAlt } from "react-icons/fa";
const SpecialCategory = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await commonRequests(
        "GET",
        "/public/collections",
        null,
        appJson
      );
      if (res.categories) {
        setList(res.categories);
      }
    };
    loadData();
  }, []);

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(Banner.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex gap-3 ml-12">
        <button className="ml-7  mt-6 bg-violet-600  text-violet-600">
          ds
        </button>
        <h2 className="text-2xl mt-5 font-bold text-orange-500">Categories </h2>
      </div>
      <h1 className="ml-14 text-2xl text-white lg:text-white mt-4 font-extrabold">
        Browse By Category
      </h1>
      <div className="grid grid-cols-2 mx-auto lg:flex gap-12 p-10 justify-center">
        {list.map((li, index) => {
          return (
            <div className=" h-34  border-2  hover:bg-red-400 hover:border-0  border-white bg-transparent p-4">
              <div className="flex items-center justify-center mt-4">
              <FaGamepad className="text-white text-4xl"/>
              </div>
              <p className="  text-white mt-3 text-sm font-bold">
                {li.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialCategory;
