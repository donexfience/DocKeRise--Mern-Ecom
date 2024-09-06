import React, { useEffect, useRef, useState } from "react";
import { editCoupon } from "../../../../redux/actions/admin/couponAction";
import axios from "axios";
import { URL } from "../../../../Common/api";
import * as Yup from "yup";
import { config } from "../../../../Common/configurations";
import {
  getPassedDateOnwardDateForInput,
  getTomorrowOnwardsDateForInput,
} from "../../../../Common/Functions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmModal from "../../../../components/ConfirmModal";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { Formik, Form, ErrorMessage, Field } from "formik";
import toast from "react-hot-toast";

const EditCoupon = () => {
  const { id } = useParams();
  const [formData, setformData] = useState(new FormData());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const dateFromTommarrow = getTomorrowOnwardsDateForInput();
  //toggling of modal
  const [showModal, setShowModal] = useState(false);
  const toggleShow = () => {
    setShowModal(!showModal);
  };
  //function that take values to formdata

  const showConfirm = (values) => {
    toggleShow();
    if (values.value > 100 && values.type === "percentage") {
      toast.error("in percentage value not greter than 100");
    } else {
      setformData(values);
    }
  };
  //coupon creating function
  const editeCouponFunction = () => {
    console.log(formData, "reeeeeeeeeeeeee");
    dispatch(editCoupon({ id, formData }));
    toggleShow();
    navigate(-1);
  };
  //formik configurations........
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
    value: Yup.number().min(0).required("Value is required"),
    minimumPurchaseAmount: Yup.number().min(0).required("Value is required"),
    maximumUses: Yup.number().min(0).required("Value is required"),
    expirationDate: Yup.date().required("Expiry date is required"),
  });
  const [initialValues, setInitialValues] = useState({
    code: "",
    description: "",
    type: "",
    value: "",
    minimumPurchaseAmount: "",
    maximumUses: "",
    expirationDate: "",
    used: "",
    isActive: "",
  });
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { data } = await axios.get(`${URL}/admin/coupon/${id}`, config);
        console.log(data, "coupon for admin edit");
        setInitialValues({
          ...data.coupon,
          expirationDate: getPassedDateOnwardDateForInput(
            data.coupon.expirationDate
          ),
        });
      } catch (error) {
        console.log(error, "error from edit coupon");
      }
    };
    loadInitialData();
  }, []);
  return (
    <>
      {showModal && (
        <ConfirmModal
          negativeAction={toggleShow}
          positiveAction={editeCouponFunction}
          title="confirm Editing coupon"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll ">
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Edit Coupon</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs list={["Dashboard", "Coupon List", "Edit Coupon"]} />
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
          enableReinitialize
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
                <p>
                  <label htmlFor="isActive" className="admin-label font-bold">
                    Is Active
                  </label>
                </p>
                <Field
                  as="select"
                  name="isActive"
                  className="capitalize admin-input w-full border  border-violet-500 p-1 mb-2 mt-2"
                >
                  <option value={true}>active</option>
                  <option value={false}>block</option>
                </Field>
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
                <p>
                  <label htmlFor="used" className="admin-label font-bold">
                    Uses (Cannot change)
                  </label>
                </p>
                <Field
                  name="used"
                  className="capitalize admin-input  w-full border bg-white border-violet-500 p-1 mb-2 mt-2"
                  disabled={true}
                />
                <ErrorMessage
                  name="used"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default EditCoupon;
