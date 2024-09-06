import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../Common/api";
import {
  BiBadgeCheck,
  BiCheckShield,
  BiPhoneCall,
} from "react-icons/bi";
import { FaShippingFast, FaStar } from "react-icons/fa";
import { renderStars } from "../../../Common/Functions";
import ReviewRow from "./ReviewRow";
import { RiSecurePaymentLine } from "react-icons/ri";

const UserReview = ({ product, id }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingCount, setRatingCount] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [error, setError] = useState("");

  const toggletab = (tab) => {
    setActiveTab(tab);
  };

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`${URL}/user/reviews/${id}`, {
        withCredentials: true,
      });
      setReviews(data.reviews);
      const ratingCounts = Array(5).fill(0);

      data.reviews.forEach((review) => {
        const rating = review.rating;
        ratingCounts[rating - 1]++;
      });
      setRatingCount(ratingCounts);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="bg-white shadow-md p-4">
      <div className="tab flex items-center justify-center gap-4 p-2">
        <button
          onClick={() => toggletab("description")}
          className={`border-b-4 font-bold ${
            activeTab === "description" ? "border-violet-500" : ""
          }`}
        >
          Description
        </button>
        <button
          onClick={() => toggletab("reviews")}
          className={`font-bold ${
            activeTab === "reviews" ? "border-b-4 border-violet-500" : ""
          }`}
        >
          Reviews
        </button>
      </div>
      <div className="bg-white border p-2">
        {activeTab === "description" && (
          <div className="gap-4">
            <div className="flex-wrap">
              <div>
                <h2 className="font-bold">Product Description</h2>
                <p className="text-sm">{product.description}</p>
              </div>
              <div>
                <h2 className="font-bold mt-4 mb-1">Offers</h2>
                <p className="text-sm">
                  Partner OfferSign-up for Flipkart Pay Later & get free Times
                  Prime Benefits worth ₹20,000*Know More Partner OfferMake a
                  purchase and enjoy a surprise cashback/ coupon that you can
                  redeem later!Know More Special PriceGet extra 42% off (price
                  inclusive of cashback/coupon)T&C Bank OfferGet ₹25* instant
                  discount for the 1st Flipkart Order using Flipkart UPIT&C
                </p>
              </div>
              <div className="">
                <ul>
                  <li className="font-semibold my-2">Feature</li>
                  <li className="description-ul font-semibold">
                    <span className="text-blue-700 text-xl">
                      <BiBadgeCheck />
                    </span>
                    Free 1 Month Warranty
                  </li>
                  <li className="description-ul font-semibold">
                    <span className="text-blue-700 text-xl">
                      <FaShippingFast />
                    </span>
                    Free Shipping & Faster Delivery
                  </li>
                  <li className="description-ul font-semibold">
                    <span className="text-blue-700 text-xl">
                      <BiCheckShield />
                    </span>
                    100% Money-back guarantee
                  </li>
                  <li className="description-ul font-semibold">
                    <span className="text-blue-700 text-xl">
                      <BiPhoneCall />
                    </span>
                    24/7 Customer Support
                  </li>
                  <li className="description-ul font-semibold">
                    <span className="text-blue-700 text-xl">
                      <RiSecurePaymentLine />
                    </span>
                    Secure payment method
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="">
            {reviews.length > 0 && (
              <div className="bg-gray-50 flex flex-col items-center justify-center w-1/6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-5xl">{product.rating}</p>
                    <FaStar />
                  </div>
                  <div className="flex">{renderStars(product.rating)}</div>
                  <p className="text-sm">
                    Customer Reviews ({product.numberOfReviews === 0
                      ? "No reviews found"
                      : product.numberOfReviews})
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 justify-center">
              {ratingCount.map((item, index) => {
                const width =
                  product.numberOfReviews === 0
                    ? 0
                    : parseInt((item / product.numberOfReviews) * 100);
                return (
                  <div className="flex items-center gap-5" key={index}>
                    <div className="flex">
                      {/* Horizontal line representing the rating level */}
                      <div className="w-12 h-1 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="flex-grow">
                      {/* Progress bar */}
                      <div className="progress h-1 bg-gray-200 rounded-full">
                        <div
                          className="progress-bar bg-red-500 rounded-full"
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs font-semibold">
                      <p>{width}%</p>
                      <p className="text-gray-500">({item})</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewRow key={index} review={review} />
              ))
            ) : (
              <p className="text-center">No reviews found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
