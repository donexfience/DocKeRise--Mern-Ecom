import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTomorrowOnwardsDateForInput } from "../../../../Common/Functions";
import ConfirmModal from "../../../../components/ConfirmModal";
import BreadCrumbs from "../../components/BreadCrumbs";
import * as Yup from "yup";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { createCoupon } from "../../../../redux/actions/admin/couponAction";
import toast from "react-hot-toast";

const CreateCoupon = () => {
  const [formData, setformData] = useState(new FormData());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const dateFromTommarrow = getTomorrowOnwardsDateForInput();
  const [showModal, setShowModal] = useState(false);
  const toggleShow = () => {
    setShowModal(!showModal);
  };
  //function that take values to formdata

  const showConfirm = (values) => {
    if (values.value > 100 && values.type === "percentage") {
      toast.error("in percentage value not greter than 100");
    } else {
      toggleShow();
    }

    setformData(values);
  };
  //coupon creating function
  const createCouponFunction = () => {
    dispatch(createCoupon(formData));
    toggleShow();
    navigate(-1);
  };
  //formik configurations........
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
    value: Yup.number().min(0).required("Value is required"),
    minimumPurchaseAmount: Yup.number()
      .min(0)
      .required("Minimum purchase amount is required"),
    maximumUses: Yup.number().min(0).required("Maximum uses is required"),
    expirationDate: Yup.date().required("Expiry date is required"),
  });

  const initialValues = {
    code: "",
    description: "",
    type: "percentage",
    value: 0,
    minimumPurchaseAmount: 0,
    maximumUses: 0,
    expirationDate: "",
  };
  return (
    <>
      {showModal && (
        <ConfirmModal
          negativeAction={toggleShow}
          positiveAction={createCouponFunction}
          title="confirm creating coupon"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll ">
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Create Coupon</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs list={["Dashboard", "Coupon List", "Create Coupon"]} />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="admin-button-fl flex gap-2 items-center rounded-lg bg-violet-600 px-4 text-white"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              type="submit"
              className="admin-button-fl flex gap-2  py-3 items-center rounded-lg bg-violet-600 px-4 text-white"
              onClick={() => {
                formikRef.current.submitForm();
              }}
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </div>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={showConfirm}
          validationSchema={validationSchema}
        >
          <Form className="lg:flex gap-5 items-start">
            <div className="lg:w-2/3">
              <div className="flex flex-col gap-3">
                <label htmlFor="title" className="admin-label font-bold mt-3">
                  Code
                </label>
                <Field
                  name="code"
                  placeholder="Type coupon code here"
                  className="admin-input uppercase p-2 rounded border border-violet-600  hover:border-black
                      "
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="code"
                  component="span"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="description"
                  className="admin-label mt-4 font-bold"
                >
                  Coupon Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="admin-input h-56 px-3 rounded border border-violet-600  hover:border-black placeholder:mt-4"
                  placeholder="Type the coupon description here"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="description"
                  component="span"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="type" className="admin-label mt-4 font-bold">
                  Coupon Type
                </label>
                <Field
                  as="select"
                  name="type"
                  className=" p-2 capitalize admin-input"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="admin-div">
                <p>
                  <label htmlFor="value" className="admin-label font-bold">
                    Value
                  </label>
                </p>
                <Field
                  name="value"
                  placeholder="Type the coupon code here"
                  className="admin-input w-full border border-violet-500 p-1 mb-2 mt-2  "
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="value"
                  component="span"
                />
                <p>
                  <label
                    htmlFor="minimumPurchaseAmount"
                    className="admin-label font-bold"
                  >
                    Minimum Purchase Amount
                  </label>
                </p>
                <Field
                  name="minimumPurchaseAmount"
                  placeholder="Type the coupon code here"
                  className="admin-input w-full border border-violet-500 p-1 mb-2 mt-2"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="minimumPurchaseAmount"
                  component="span"
                />
                <p>
                  <label
                    htmlFor="maximumUses"
                    className="admin-label font-bold"
                  >
                    Maximum Uses
                  </label>
                </p>
                <Field
                  name="maximumUses"
                  placeholder="Type the coupon code here"
                  className="admin-input w-full border  border-violet-500 p-1 mb-2 mt-2"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="maximumUses"
                  component="span"
                />
              </div>
              <div className="admin-div">
                <p>
                  <label
                    htmlFor="expirationDate"
                    className=" font-bold admin-label"
                  >
                    Expiry Date
                  </label>
                </p>
                <Field
                  name="expirationDate"
                  type="date"
                  min={dateFromTommarrow}
                  placeholder="Type the coupon code here"
                  className="admin-input w-full border border-violet-500 p-1 mb-2 mt-2"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="expirationDate"
                  component="span"
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateCoupon;
