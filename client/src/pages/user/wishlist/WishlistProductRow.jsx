import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../../Common/api";
import axios from "axios";
import { config } from "../../../Common/configurations";
import toast from "react-hot-toast";

const WishlistProductRow = ({ item, isLast, toggleProductConfirm }) => {
  console.log(item, "00000000000000000000000000000000");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = async () => {
    try {
      console.log("Adding to cart...");
      await axios.post(
        `${URL}/user/wishlist/addToCart`,
        {
          product: item.product._id,
          quantity: 1,
        },
        { ...config, withCredentials: true }
      );
      toast.success("Added to cart");
    } catch (error) {
      const err = error.response.data.error;
      toast.error(err);
    }
  };

  return (
    <tr className={isLast ? "border  p-2 shadow-md" : "border mt-4 mb-4"}>
      <td
        className="flex hover: cursor-pointer items-center px-4  hover:text-violet-500 "
        onClick={() => navigate(`/product/${item.product._id}`)}
      >
        <div className="flex bg-grey-100 items-center gap-x-3 p-2">
          <div className="ml-6 md-3 w-12 h-10 flex-shrink-0">
            {item.product.imageURL ? (
              <img
                src={`${URL}/img/${item.product.imageURL}`}
                alt="Products-cart"
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="w-10 h-10 bg-white rounded-md"></div>
            )}
          </div>
          <p className="w-52 h-10   text-black font-semibold">
            {item.product.name}
          </p>
        </div>
      </td>
      <td className=" text-black font-semibold">
        {item.product.price + item.product.markup}
      </td>
      <td className="w-24 text-center text-black font-semibold ">
        {item.product.status}
      </td>
      <td className="px-10 flex pb-6 gap-4">
        <button
          onClick={() => toggleProductConfirm(item.product._id)}
          className="cursor-pointer"
        >
          <AiOutlineDelete className="text-xl text-black font-semibold" />
        </button>
        <button onClick={() => addToCart()} className="cursor-pointer">
          <AiOutlineShoppingCart className="text-xl text-black font-semibold" />
        </button>
      </td>
    </tr>
  );
};

export default WishlistProductRow;
