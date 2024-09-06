import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config } from "../../../Common/configurations";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Modal from "../../../components/Modal";
import ProductReview from "./ProductReview";
import CancelOrder from "./CancelOrder";
import backbutton from "../../../assets/backbutton.png";
import { TiCancel } from "react-icons/ti";
import date from "date-and-time";
import OrderDates from "./components/OrderDates";
import { formatDate, modifyPaymentText } from "../../../Common/Functions";
import StatusComponent from "../../../components/StatusComponent";
import StatusHistoryLoadingBar from "./components/StatusHistoryProgressBar";
import OrderDetailProductRow from "./components/OrderDetailProductRow";
import OrderDetailsProductRow from "./components/OrderDetailProductRow";
import OrderHistoryAddress from "./components/OrderHistoryAddress";
import YourReview from "./components/YourReview";
import ReturnOrder from "./ReturnOrder";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import { FaMoneyBillWave, FaTruck, FaTags } from "react-icons/fa";

import { AiOutlineDollarCircle } from "react-icons/ai";
const OrderDetail = () => {
  const today = new Date();
  const naviagte = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //cancel modal
  const [cancelModal, setCancelModal] = useState(false);
  const togglecancelModal = () => {
    setCancelModal(!cancelModal);
  };

  //return modal

  const [returnModal, setReutrnModal] = useState(false);
  const toggleReturnModal = () => {
    setReutrnModal(!returnModal);
  };
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const toggleReviewModal = (review) => {
    setReviewProduct(review);
    console.log(review, "--------------------------------");
    setReviewModal(!reviewModal);
  };
  //fetching id from the URL

  const { id } = useParams();
  //loading user data on Initial load
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/user/order/${id}`, config);
      if (res) {
        setOrderData(res.data.order);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  //fetching data at initial
  useEffect(() => {
    loadData();
  }, [id]);

  const apikey = import.meta.env.VITE_EASYINVOICE;
  //download invioce for a order

  const downloadInvoice = async () => {
    try {
      const response = await axios.get(`${URL}/user/order-invoice-pdf/${id}`, {
        withCredentials: true,
        responseType: "blob",
      });

      saveAs(response.data, "invoice.pdf");
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  console.log(orderData, "999999999");
  return (
    <div className="w-full">
      {reviewModal && (
        <Modal
          content={
            <ProductReview
              closeToggle={toggleReviewModal}
              reviewingProduct={reviewProduct}
              id={id}
            />
          }
        />
      )}
      {cancelModal && (
        <Modal
          content={
            <CancelOrder
              id={id}
              closeToggle={togglecancelModal}
              loadData={loadData}
            />
          }
        />
      )}
      {returnModal && (
        <Modal
          content={
            <ReturnOrder
              closeToggle={toggleReturnModal}
              loadData={loadData}
              id={id}
            />
          }
        />
      )}

      {orderData && (
        <div className="w-full">
          <div className="bg-white w-full shadow-xl p-5  min-h-screen ">
            <div className="rounded-lg bg-white">
              <div className="bg-white border-b pb-3 flex items-center justify-between px-5 py-1">
                <div className="flex items-center">
                  <div
                    onClick={() => naviagte(-1)}
                    className="cursor-pointer mr-2"
                  >
                    <img src={backbutton} alt="Back" />
                  </div>
                  <h1 className="font-semibold text-sm sm:text-lg uppercase">
                    Order Details
                  </h1>
                </div>
                <div>
                  {(orderData.status === "pending" ||
                    orderData.status === "processing" ||
                    orderData.status === "shipped") && (
                    <button
                      className="border border-white bg-violet-500 flex items-center gap-2 text-white py-2 px-3 font-semibold rounded"
                      onClick={togglecancelModal}
                    >
                      Cancel Order <TiCancel className="mt-1 text-red-500" />
                    </button>
                  )}
                  {orderData.status === "delivered" && (
                    <div className="border border-violet-500 px-2 text-blue-500 rounded-md font-bold py-4">
                      <p className="text-lg">
                        Last Date for Return is:{" "}
                        {formatDate(orderData.statusHistory[1].returndate)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* price Id, and Product Details placement dates and other informations */}
              <div className="bg-white shadow-xl p-2 border border-violet-400 rounded-md mt-3">
                <div className="sm:flex items-center justify-between">
                  <div>
                    <h1 className="sm:text-lg font-bold">
                      # {orderData.orderId || orderData.id}
                    </h1>
                    <p className="font-bold text-blue-400">
                      {orderData.totalQuantity} pieces
                    </p>
                    <p>
                      {"Order will be placed in"}{" "}
                      {date.format(new Date(orderData.createdAt), "DD-MM-YYYY")}
                    </p>
                  </div>
                  <h1 className="text-2xl font-bold">
                    {orderData.totalPrice} ₹
                  </h1>
                </div>
              </div>
              {/* delivery date and status */}
              <div className="px-5 p-5 border-b flex gap-2 sm:gap-2item-center justify-between">
                <div>
                  {<OrderDates orderData={orderData} />}
                  <p className="text-violet-500 font-bold">
                    {modifyPaymentText(orderData.paymentMode)}
                  </p>
                  <div className="flex gap-3">
                    {orderData.status === "payment failed" && (
                      <button
                        className="bg-violet-500 px-3 rounded-md py-3 mt-3 text-white font-bold flex gap-3 items-center"
                        onClick={() =>
                          naviagte(
                            `/dashboard/order-history/detail/${id}/repayment`
                          )
                        }
                      >
                        Payment Again <AiOutlineDollarCircle />
                      </button>
                    )}
                    {orderData.status !== "payment failed" && (
                      <button
                        className="bg-violet-500 px-3 rounded-md  py-3 mt-3 text-white font-bold flex gap-3 items-center"
                        onClick={downloadInvoice}
                      >
                        Invoice <FaDownload />
                      </button>
                    )}
                  </div>
                </div>
                <div className="3rd column">
                  <StatusComponent status={orderData.status} />
                </div>
              </div>

              <div className="px-5 w-full border-b mt-3">
                <h1 className="text-lg font-bold pb-3">
                  Products <span className="">({orderData.totalQuantity})</span>
                </h1>
              </div>
              <div>
                <div className="overflow-x-auto border--t">
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <td className="font-bold py-2 px-1 w-4/12">Products</td>
                        <td className="py-2 px-1 font-bold w-1/12">Price</td>
                        <td className="font-bold py-2 px-1 w-1/12">Quantity</td>
                        <td className="font-bold py-2 px-1 w-1/12">
                          Sub-Total
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.products &&
                        orderData.products.map((item, index) => (
                          <OrderDetailsProductRow
                            index={index}
                            item={item}
                            length={orderData.products.length}
                            key={index}
                            status={orderData.status}
                            toggleReviewModal={toggleReviewModal}
                            statusHistory={
                              (orderData.statusHistory[1] &&
                                orderData.statusHistory[1].returndate) ||
                              today
                            }
                            toggleReturnModal={toggleReturnModal}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end">
                  <div className="bg-white-100 rounded-lg p-8 shadow-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <FaTags className="text-violet-500 text-3xl mb-2" />
                        <p className="font-bold text-gray-700">Subtotal</p>
                        <p className="text-gray-600">{orderData.subTotal}₹</p>
                      </div>
                      <div className="flex flex-col">
                        <FaTruck className="text-violet-500 text-3xl mb-2" />
                        <p className="font-bold text-gray-700">Shipping</p>
                        <p className="text-gray-600">
                          {orderData.shipping === 0
                            ? "Free"
                            : `${orderData.shipping}₹`}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <FaTags className="text-violet-500 text-3xl mb-2" />
                        <p className="font-bold text-gray-700">Discount</p>
                        <p className="text-gray-600">
                          {orderData.discount || 0}₹
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <FaMoneyBillWave className="text-violet-500 text-3xl mb-2" />
                        <p className="font-bold text-gray-700">Tax</p>
                        <p className="text-gray-600">{orderData.tax}₹</p>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-700">Total</p>
                      <p className="font-semibold text-violet-500">
                        {orderData.totalPrice}₹
                      </p>
                    </div>
                  </div>
                </div>
                {orderData && (
                  <div className="pt-5">
                    <YourReview id={id} products={orderData.productId} />
                  </div>
                )}
                <div
                  className=" font-bold lg:flex items-center justify-center gap-10
                "
                >
                  <div className="border-b lg:border-b-0 lg:border-r-2 pr-4">
                    <p className="text-violet-500 font-bold text-xl pb-4">
                      Billing Address
                    </p>
                    {orderData.address && (
                      <OrderHistoryAddress
                        address={orderData.address}
                        title="Billing Address"
                      />
                    )}
                  </div>

                  <div className="border-b lg:border-b-0  pr-4">
                    <p className="text-violet-500 font-bold text-xl pb-4">
                      Shipping Address
                    </p>
                    {orderData.address && (
                      <OrderHistoryAddress
                        address={orderData.address}
                        title="Billing Address"
                      />
                    )}
                  </div>
                </div>
                {orderData.statusHistory &&
                  (orderData.status === "pending" ||
                    orderData.status === "processing" ||
                    orderData.status === "shipped" ||
                    orderData.status === "delivered") && (
                    <div className="px-5 pt-5 ">
                      <StatusHistoryLoadingBar
                        statusHistory={orderData.statusHistory}
                      />
                    </div>
                  )}
                <div className="lg:w-1/3 p-5">
                  <h1 className="font-bold">Order Notes</h1>
                  <p className="text-black">
                    {orderData.additionalNotes || "Not Added"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
