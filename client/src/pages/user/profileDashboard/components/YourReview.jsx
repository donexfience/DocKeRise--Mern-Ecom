import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../../redux/actions/user/uesrReviewAction";
import ReviewRows from "./ReviewRows";

const YourReview = ({ id, products }) => {
  const dispatch = useDispatch();
  const { reviews, error, loading } = useSelector((state) => state.reviews);
  console.log(
    "🚀 ~ file: YourReview.jsx:9 ~ YourReview ~ reviews:",
    reviews.reviews
  );
  useEffect(() => {
    dispatch(getReviews(id));
  }, []);
  return (
    <div className="bg-white rounded-lg p-5 mt-5">
      <h1 className="text-lg font-semibold">Your Reviews</h1>
      <div className="flex gap-2 items-center">
        {reviews && reviews.reviews && reviews.reviews.length > 0 ? (
          reviews.reviews.map((item, index) => {
            return <ReviewRows product={item.product} review={item} />;
          })
        ) : (
          // Return a div with some text if there are no reviews
          <div>No reviews available</div>
        )}
      </div>
    </div>
  );
};

export default YourReview;
