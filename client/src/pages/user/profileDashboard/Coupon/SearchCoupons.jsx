import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import { URL } from "../../../../Common/api";
import axios from "axios";
import { config } from "../../../../Common/configurations";
import nocoupon from "../../../../assets/no.svg";

const SearchCoupons = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    code: searchParams.get("code") || "",
    minimumPurchaseAmount: searchParams.get("minimumPurchaseAmount") || "",
    expirationDate: searchParams.get("expirationDate") || "",
    type: searchParams.get("type") || "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Coupon code is required"),
    minimumPurchaseAmount: Yup.number()
      .min(0)
      .required("Minimum purchase amount is required"),
    expirationDate: Yup.date().required("Expiration date is required"),
    type: Yup.string().required("Type is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(values).toString();
      setSearchParams(queryParams);
    } catch (error) {
      console.error("Error setting search params:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("calling search copupon");
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${URL}/user/searchedcoupons${
            searchParams.toString() && `?${searchParams.toString()}`
          }`,
          config
        );
        console.log(response.data.coupons);
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Search Coupons</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="code" className="font-bold block text-black mb-1">
              Coupon Code:
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) =>
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("code", e.target.value);
                  return params.toString();
                })
              }
            />
            <ErrorMessage
              name="code"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="minimumPurchaseAmount"
              className="font-bold block text-black mb-1"
            >
              Minimum Purchase Amount:
            </label>
            <input
              type="number"
              id="minimumPurchaseAmount"
              name="minimumPurchaseAmount"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) =>
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("minimumPurchaseAmount", e.target.value);
                  return params.toString();
                })
              }
            />
            <ErrorMessage
              name="minimumPurchaseAmount"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="expireDate"
              className="font-bold block text-black mb-1"
            >
              Expiration Date:
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) =>
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("expirationDate", e.target.value);
                  return params.toString();
                })
              }
            />
            <ErrorMessage
              name="expireDate"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="type" className="font-bold block text-black mb-1">
              Type:
            </label>
            <select
              id="type"
              name="type"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) =>
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("type", e.target.value);
                  return params.toString();
                })
              }
            >
              <option value="">Select type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-violet-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Search
          </button>
        </Form>
      </Formik>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mt-8">Matching Coupons</h3>
          <table className="w-full mt-4 shadow-md">
            <thead>
              <tr className="border-2 bg-gray-50">
                <th className="px-4 py-2 border">Coupon Code</th>
                <th className="px-4 py-2">Value/Offer</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr className="">
                  <td colSpan="2" className="text-center border py-4">
                    <div className="flex flex-col items-center">
                      <img src={nocoupon} alt="No coupons found" />
                      <p className="mt-2">No coupons found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="border">
                    <td className="px-4 py-2">{coupon.code}</td>
                    <td className="px-4 py-2">{coupon.value}</td>{" "}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchCoupons;
