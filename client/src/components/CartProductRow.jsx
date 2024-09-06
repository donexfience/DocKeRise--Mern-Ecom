import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCount,
  incrementCount,
} from "../redux/actions/user/cartAction";
import { useNavigate } from "react-router-dom";
import { URL } from "../Common/api";
import JustLoading from "./JustLoading";
import Quantity from "../pages/user/components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";

const CartProductRow = ({ item, isLast, toggleProductConfirm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(item, "cart row item==================");
  const { cartId, countLoading } = useSelector((state) => state.cart);

  const increment = (item) => {
    dispatch(incrementCount({ cartId, productId: item.product._id }));
  };

  const decrement = (item) => {
    dispatch(decrementCount({ cartId, productId: item.product._id }));
  };
  let priceWithMarkup = item.product.price + item.product.markup;
  let offerPrice = (priceWithMarkup * item.product.offer) / 100;
  let totalPrice = priceWithMarkup - offerPrice;

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
                src={`${URL}/img/${item.product?.imageURL}`}
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
        {totalPrice.toFixed(0)}
      </td>
      <td className="w-24 text-center text-black font-semibold ">
        {countLoading ? (
          <JustLoading size={10} />
        ) : (
          <Quantity
            count={item.quantity}
            increment={() => increment(item)}
            decrement={() => decrement(item)}
          />
        )}
      </td>
      <td className="ps-12 text-black font-semibold">
        {((totalPrice) * item.quantity).toFixed(0)}
      </td>
      <td>
        <div
          onClick={() => toggleProductConfirm(item.product._id)}
          className="cursor-pointer"
        >
          <AiOutlineDelete className="text-xl text-black font-semibold" />
        </div>
      </td>
    </tr>
  );
};

export default CartProductRow;
