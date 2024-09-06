import React from "react";
import { Link } from "react-router-dom";
import { URL } from "../Common/api";

const ProductCard = ({data}) => {
  return (
    <div className="flex-shrink-0 text-center">
      <div className="w-56 h-56 mx-auto">
        <img
          className="h-full w-full object-contain bg-white"
          src={`${URL}/img/${data.imageURL}`}
          alt={data.name}
        />
      </div>
      {/* <p className="text-orange-800 font-bold my-2">New Arrival</p> */}
      <h1 className="text-2xl text-black font-bold my-2 w-56 line-clamp-1">{data.name}</h1>
      <h2 className="my-2 text-orange-500 mb-5">₹{data.price + data.markup}</h2>
      <Link
        className=" bg-violet-600 rounded  no-pad px-7 py-2 lg:px-12  text-white"
        to="/login"
      >
        Buy
      </Link>
    </div>
  );
};

export default ProductCard;
