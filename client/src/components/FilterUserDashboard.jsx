import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../Common/api";
import { config } from "../Common/configurations";
import { BiTrash } from "react-icons/bi";

const FilterUserDashboard = ({ handleClick, filters, price, clearFilters }) => {
  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    const { data } = await axios.get(`${URL}/user/categories`, config);
    setCategories(data.categories);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  console.log(categories,"[[[[[[[[[[[[[[[[[[[[[")
  return (
    <div className="lg:w-1/5">
      <ul className="hidden lg:block">
        <li className="uppercase text-black font-bold mb-4">Category's</li>
        {categories.map((item) => {
          return (
            <li className="category-lists mb-3 text-violet-400 " key={item._id}>
              <input
                type="checkbox"
                name="category"
                value={item._id}
                checked={Array.isArray(filters) && filters.includes(item._id)}
                onChange={(e) => handleClick("category", e.target.value)}
              />{" "}
              {item.name}
            </li>
          );
        })}
        <li className=" text-black  font-bold mb-4 uppercase">
          price range
        </li>
        <li
          className="category-li font-semibold text-violet-400 mb-2
        "
        >
          <input
            type="radio"
            name="pricerange"
            value=""
            checked={price === ""}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          All Price
        </li>
        <li className="category-li font-semibold text-violet-400 mb-2">
          <input
            type="radio"
            name="priceRange"
            value="Above 10000"
            checked={price === "Above 10000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Above 10000₹
        </li>
        <li className="category-li font-semibold text-violet-400 mb-2">
          <input
            type="radio"
            name="priceRange"
            value="5000-10000"
            checked={price === "5000-10000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          5000₹ - 10000₹
        </li>
        <li className="category-li font-semibold text-violet-400 mb-2">
          <input
            type="radio"
            name="priceRange"
            value="2000-4999"
            checked={price === "2000-4999"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          2000₹ - 5000₹
        </li>
        <li className="category-li font-semibold text-violet-400 mb-2">
          <input
            type="radio"
            name="priceRange"
            value="1000-1999"
            checked={price === "1000-1999"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          1000₹ - 1999₹
        </li>
        <li className="category-li font-semibold text-violet-400 mb-2">
          <input
            type="radio"
            name="priceRange"
            value="500-999"
            checked={price === "500-999"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          500₹ - 1000₹
        </li>
        <li className="category-li font-semibold text-violet-400 mb-2">
          <input
            type="radio"
            name="priceRange"
            value="below 499"
            checked={price === "Under 499"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
           below 499{" "}
        </li>
        <li>
          <button
            className={
              "mt-7 text-center bg-violet-500 hover:bg-red-500 active:bg-red-400 outline-none px-7 py-3 rounded font-bold justify-center text-white flex items-center gap-2"
            }
            onClick={clearFilters}
          >
            <BiTrash />
            <p className="text-xs">Clear all</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterUserDashboard;
