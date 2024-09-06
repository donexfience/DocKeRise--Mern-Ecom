import React from "react";
import { URL } from "../../../../Common/api";
import { renderStars, timeAgo } from "../../../../Common/Functions";
import { AiOutlineEdit } from "react-icons/ai";

const ReviewRows = ({ review, product }) => {
  console.log(review, "=========================", product);
  return (
    <div className="py-4 border-b border-gray-200">
      {/* Review Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {review.user.profileImgURL ? (
            <img
              src={`${URL}/img/${review.user.profileImgURL}`}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200"></div>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <h1 className="text-lg font-semibold">
            {review.user.firstName} {review.user.lastName}
          </h1>
          <p className="text-sm text-gray-500">
            {timeAgo(review.createdAt)}
          </p>
          <div className="flex gap-1">{renderStars(review.rating)}</div>
        </div>
        <div className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer">
          <AiOutlineEdit />
        </div>
      </div>
      
      {/* Review Content */}
      <div className="flex gap-4">
        {product && (
          <div className="w-1/4">
            <div className=" rounded-md overflow-hidden">
              {product.imageURL ? (
                <img
                  src={`${URL}/img/${product.imageURL}`}
                  alt="Product"
                  className="object-cover w-full h-40"
                />
              ) : (
                <div className="bg-gray-200 w-full h-40"></div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{review.title}</h2>
                <p className="text-sm text-gray-500">{review.body}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* You can add more content here if needed */}
      </div>
    </div>
  );
};

export default ReviewRows;
