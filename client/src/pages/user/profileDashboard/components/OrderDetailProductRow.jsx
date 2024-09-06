import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { URL } from "../../../../Common/api";
import { IoMdUndo } from "react-icons/io";

const OrderDetailsProductRow = ({
  length,
  index,
  item,
  status,
  toggleReviewModal,
  statusHistory,
  toggleReturnModal,
}) => {
  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";
  const OfferPrice = (item.totalPrice * item.productId.offer) / 100;
  let subTotal = item.totalPrice - OfferPrice;
  const [isReturnable, setIsReturnable] = useState(false);
  console.log(item, "00000000000");
  useEffect(() => {
    const givenDate = new Date(statusHistory);
    const today = new Date();

    if (givenDate > today) {
      setIsReturnable(true);
    } else {
      setIsReturnable(false);
    }
  }, [statusHistory]);

  return (
    <tr className={classes}>
      <td className="admin-table-row">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 overflow-clip flex justify-center items-center shrink-0">
            {item.productId.imageURL ? (
              <img
                src={`${URL}/img/${item.productId.imageURL}`}
                alt="img"
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="w-14 h-1w-14 bg-slate-300 rounded-md"></div>
            )}
          </div>
          <div className="flex gap-4 font-bold items-center">
            <Link to={`/product/${item.productId._id}`}>
              <p className="lg:text-lg font-semibold text-blue-600 line-clamp-1 hover:underline cursor-pointer">
                {item.productId.name}
              </p>
            </Link>
            <p className="line-clamp-2">{item.productId.description}</p>
          </div>
        </div>
      </td>
      <td className="admin-table-row">{Math.round(subTotal)}</td>
      <td className="admin-table-row">{item.quantity}</td>
      <td className="admin-table-row">
        {Math.round(subTotal * item.quantity)}
      </td>
      <div className="flex gap-8">
        {status !== "pending" &&
          status !== "processing" &&
          status !== "shipped" && (
            <td className="flex items-center justify-center">
              <p
                className="font-semibold flex items-center gap-1 text-white cursor-pointer bg-violet-500 p-3 mr-22 hover:bg-blue-100  rounded-lg shrink-0"
                onClick={() => {
                  console.log(item);
                  toggleReviewModal(item.productId);
                }}
              >
                Leave a Review <BiMessageSquareDetail />
              </p>
            </td>
          )}
        {isReturnable && (
          <td className="flex items-center justify-center">
            <button
              className="font-semibold flex items-center gap-1 text-white cursor-pointer bg-blue-500 px-4 py-3 mr-22 hover:bg-blue-100  rounded-lg shrink-0"
              onClick={() => {
                console.log(item);
                toggleReturnModal();
              }}
              disabled={status === "returned" || status === "return request"}
            >
              Return <IoMdUndo />
            </button>
          </td>
        )}
      </div>
    </tr>
  );
};

export default OrderDetailsProductRow;
