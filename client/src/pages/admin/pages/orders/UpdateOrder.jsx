import React from "react";
import { useDispatch } from "react-redux";
import {
  getPassedDateOnwardDateForInput,
  getTodayOnwardDateForInput,
} from "../../../../Common/Functions";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { updateOrderStatus } from "../../../../redux/actions/admin/orderAction";

const UpdateOrder = ({ toggleModal, datas, orders }) => {
  const dispatch = useDispatch();
  const { id, status, paymentMode, deliveryDate } = datas;
  console.log(datas, "dddddd");
  const orderdDate = getPassedDateOnwardDateForInput(deliveryDate);
  console.log(orderdDate, "=========");
  const todyDate = getTodayOnwardDateForInput();
  const currentDate = new Date();
  const returnDate = new Date(currentDate);
  returnDate.setDate(returnDate.getDate() + 7);

  const initialValues = {
    date: "",
    status: status,
    description: "",
    paymentStatus: "",
    returndate: "",
  };
  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    description: Yup.string(),
    paymentStatus: Yup.string().nullable(),
  });
  const handleSubmit = (values) => {
    if (values.status !== "delivered" && values.paymentStatus === "") {
      delete values.paymentStatus;
    }
    dispatch(updateOrderStatus({ id, formData: values })).then(() => {
      toggleModal({});
    });
  };
  console.log(orders, "========orderdata admin table row");

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-lg">Update Order</h1>
              <AiOutlineClose
                className="cursor-pointer text-xl"
                onClick={toggleModal}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block mb-1 font-semibold">
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                disabled={status === "delivered"}
              >
                <option value="pending" disabled={status !== "pending"}>
                  Pending
                </option>
                <option
                  value="processing"
                  disabled={status === "delivered" || status === "processing"}
                >
                  Processing
                </option>
                <option
                  value="shipped"
                  disabled={
                    status === "shipped" ||
                    status === "delivered" ||
                    status === "processing"
                  }
                >
                  Shipped
                </option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Field>

              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {values.status === "delivered" &&
              paymentMode === "cashOnDelivery" && (
                <div className="mb-4">
                  <label
                    htmlFor="paymentStatus"
                    className="block mb-1 font-semibold"
                  >
                    Payment Collected or Not
                  </label>
                  <Field
                    as="select"
                    name="paymentStatus"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Choose Yes or No</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field>
                  <ErrorMessage
                    name="paymentStatus"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}
            <div className="mb-4">
              <label htmlFor="date" className="block mb-1 font-semibold">
                Date
              </label>
              <Field
                type="date"
                name="date"
                min={orderdDate}
                max={todyDate}
                value={todyDate}
                readOnly
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />

              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block mb-1 font-semibold">
                Return Date
              </label>
              <Field
                type="date"
                name="returndate"
                min={orderdDate}
                value={returnDate.toISOString().split("T")[0]} 
                readOnly
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />

              <ErrorMessage
                name="returndate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1 font-semibold">
                Description
              </label>
              <Field
                type="text"
                name="description"
                as="textarea"
                rows="4"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-violet-500 px-6 py-3 rounded-md text-white font-bold hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateOrder;
