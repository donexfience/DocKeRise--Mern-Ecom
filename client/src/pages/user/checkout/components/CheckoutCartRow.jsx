import React from "react";
import { URL } from "../../../../Common/api";

const CheckoutCartRow = ({ item }) => {
  const finalPrice = item.product.price + item.product.markup;
  console.log(finalPrice, item.product.offer);
  const offerPrice = (finalPrice * item.product.offer) / 100;
  console.log(offerPrice);
  const lastPrice = finalPrice - Math.round(offerPrice);
  console.log(lastPrice);
  console.log(item, "\\\\\\\\\\\\\\");
  return (
    <div className="flex gap-2 items-center mb-3">
      <div className="w-9 h-9 shrink-0">
        <img
          src={`${URL}/img/${item.product.imageURL}`}
          alt="im"
          className="h-full w-full object-contain"
        />
      </div>
      <div>
        <p className="text-sm font-semibold line-clamp-1">
          {item.product.name}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {item.quantity} x{" "}
          <span className="font-semibold text-blue-500">{lastPrice}₹</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutCartRow;
