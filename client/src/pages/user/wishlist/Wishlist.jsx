import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteEntireWishlist,
  deleteOneProduct,
  getWishlist,
} from "../../../redux/actions/user/wishlistAction";
import BreadCrumbs from "../../admin/components/BreadCrumbs";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmModal from "../../../components/ConfirmModal";
import JustLoading from "../../../components/JustLoading";
import wishlistlogo from "../../../assets/wishlist.webp";
import CartProductRow from "../../../components/CartProductRow";
import WishlistProductRow from "./WishlistProductRow";
import toast from "react-hot-toast";
import { URL } from "../../../Common/api";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const { wishlist, loading, wishlistId } = useSelector(
    (state) => state.wishlist
  );
  //initially fetching data of wishlist

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);
  console.log("wishlist data", wishlist, loading, wishlistId);

  //deleting a single product
  const deletingsingleProduct = () => {
    dispatch(deleteOneProduct({ wishlistId, productId }))
      .then(() => {
        // After successfully deleting the product, fetch the updated cart data
        dispatch(getWishlist());
      })
      .catch((error) => {
        // Handle any errors, if necessary
        console.error("Error deleting product:", error);
      });
    toggleSingleConfirm("");
  };

  //toggle for single product delete
  const [showSingleConfirm, setShowSingleConfirm] = useState(false);
  const toggleSingleConfirm = (id) => {
    setProductId(id);
    setShowSingleConfirm(!showSingleConfirm);
  };
  const deleteWishlist = () => {
    if (wishlist.length < 0) {
      toast.error("wishlist empty");
    }
    toggleConfirm();
    dispatch(deleteEntireWishlist(wishlistId));
  };

  //toggle for whole delete
  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  //add to cart

  return (
    <div className="w-full">
      <div className="bg-white flex lg:flex-row flex-col gap-5 lg:px-28 px-5  min-h-screen">
        <div className="lg:w-full  bg-white border  border-gray-200 shadow-lg ">
          <BreadCrumbs list={["Home", "Wishlist"]} />
          <div className="mb-4 bg-white  p-4 flex items-center justify-between">
            <h2 className="text-violet-500 font-bold text-lg ">Wishlist</h2>
            <div className="">
              <button
                className="bg-violet-600 p-3 text-white rounded-md flex items-center gap-3 font-semibold"
                onClick={toggleConfirm}
              >
                Delete Wishlist <AiOutlineDelete />
              </button>
            </div>
          </div>
          {showConfirm && (
            <ConfirmModal
              title="confirm deleting the wishlist"
              positiveAction={deleteWishlist}
              negativeAction={() => toggleConfirm("")}
            />
          )}
          {showSingleConfirm && (
            <ConfirmModal
              title="confirm delete"
              negativeAction={() => toggleSingleConfirm("")}
              positiveAction={() => deletingsingleProduct()}
            />
          )}
          {loading ? (
            <div className="flex items-center bg-gray-100 shadow-lg justify-center h-full">
              <JustLoading size={20} />
            </div>
          ) : wishlist.length > 0 ? (
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left font-bold text-lg border text-violet-500">
                      Products
                    </th>
                    <th className="px-3 py-3 text-left font-bold text-lg border text-violet-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-lg border text-violet-500">
                      status
                    </th>
                    <th className="px-12 py-3 text-left font-bold text-lg border text-violet-500 ">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item, index) => (
                    <WishlistProductRow
                      key={index}
                      item={item}
                      isLast={index === wishlist.length - 1}
                      toggleProductConfirm={toggleSingleConfirm}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="flex flex-col items-center">
                <img
                  src={wishlistlogo}
                  alt="Empty Cart Icon"
                  className="w-full lg:w-1/2"
                />
                <p className="text-gray-500 mt-4 text-lg font-bold">
                  Your wishlist is empty
                </p>
                <Link
                  to="/"
                  className="py-2 text-blue-500 hover:underline text-lg font-semibold "
                >
                  Go back to shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
