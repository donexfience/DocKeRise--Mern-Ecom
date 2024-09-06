import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { cancelOrder } from "../../../redux/actions/user/orderAction";
const CancelOrder = ({ id, closeToggle, loadData }) => {
  const dispatch = useDispatch();
  const initialValues = {
    reason: "",
  };
  const validationSchema = Yup.object().shape({
    reason: Yup.string()
      .required("Return reason is required")
      .max(22, "Only 22 characters are allowed"),
  });

  const handleSubmit = (value) => {
    dispatch(cancelOrder({ formData: value, id: id }))
      .then(() => {
        loadData();
        closeToggle();
      })
      .catch((error) => {
        console.log(error, "error of canceling order");
      });
  };

  return (
    <div className="bg-gray-100 w-full lg:w-full shadow-2xl overflow-y-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Confirm Cancellation</h1>
        <AiOutlineClose
          className="text-xl cutsor-pointer"
          onClick={closeToggle}
        />
      </div>
      <div className="p-3">
        <h1 className="">Enter reasoan for cancelation</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              name="reason"
              as="textarea"
              className="h-36 lg:h-64 w-full p-5 rounded mt-2"
              placeholder="Type the reason here"
            />
            <ErrorMessage
              className="text-sm text-red-500"
              name="reason"
              component="span"
            />

            <button
              className="bg-violet-500 p-2 rounded-md text-white w-full mt-3"
              type="submit"
            >
              Cancel Order
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CancelOrder;
