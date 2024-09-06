import React from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Common/api";
import { FaHeart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  console.log(product, "--------------product----------card");
  console.log(
    product.price,
    product.markup,
    product.offer,
    "calculationssssss"
  );

  // Calculate the discounted price
  let priceWithMarkup = product.price + product.markup;
  let offerPrice = (priceWithMarkup * product.offer)/100;
  let totalPrice = priceWithMarkup - offerPrice;

  return (
    <div
      className="relative p-5 bg-white rounded-lg shadow-xl hover:shadow- cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Product Image */}
      <div className="overflow-hidden rounded-lg h-56 mb-4">
        <img
          src={`${URL}/img/${product.imageURL}`}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Title */}
      <p className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
        {product.name}
      </p>

      {/* Product Price and Rating */}
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-md text-blue-500">
          {product.offer ? (
            <>
              <span className="text-gray-500 line-through">
                {(product.price + product.markup).toFixed(0)}₹
              </span>{" "}
            </>
          ) : null}
          {totalPrice.toFixed(0)}₹{" "}
          {/* Displaying the discounted price + markup */}
        </p>
        <div className="flex items-center text-yellow-500">
          <FaStar className="mr-1" />
          <span>
            {typeof product.rating === "number" && !isNaN(product.rating)
              ? parseFloat(product.rating).toFixed(1)
              : "0"}
          </span>
        </div>
      </div>

      {/* Additional content */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-red-500 mr-2">
            <FaHeart className="text-red-500" /> {/* Heart icon */}
          </button>
          <p className="text-sm text-green-600">
            Available: {product.availability}
          </p>
        </div>
        <button className="px-3 py-1 text-sm font-semibold text-white bg-violet-500 rounded-md hover:bg-blue-600 focus:outline-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
