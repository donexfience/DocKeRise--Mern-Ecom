import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewCategory,
  createNewOffer,
} from "../../../../redux/actions/admin/categoriesAction";
import ConfirmModal from "../../../../components/ConfirmModal";
import * as Yup from "yup";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { URL } from "../../../../Common/api";
const CreateOffer = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await axios.get(`${URL}/admin/category/${id}`);
        const category = response.data.category;
        console.log("Category from API:", category);
        setInitialValues({
          title: category.name,
          description: category.description,
        });
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };
    loadInitialData();
  }, [id]);

  const saveCategory = () => {
    dispatch(createNewOffer(formData));
    toggleModal();
    navigate(-1);
  };
  const [formData, setFormData] = useState(new FormData());

  const showConfirm = (value) => {
    console.log(value);
    toggleModal();  
    const updatedFormData = {}
    updatedFormData.title= value.title;
    updatedFormData.description= value.description;
    updatedFormData.offer= value.offer
    updatedFormData.startingDate =value.startingDate
    updatedFormData.endingDate=value.endingDate
    updatedFormData.category= id
    setFormData(updatedFormData);
    console.log(formData,"33333333333333333")
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    offer: "",
    startingDate: "",
    endingDate: "",
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    offer: Yup.number().min(0).max(100).required("Offer is required"),
    startingDate: Yup.date()
      .min(new Date(), "Starting date must be today or later")
      .required("Starting date is required"),
    endingDate: Yup.date()
      .min(
        Yup.ref("startingDate"),
        "Ending date must be later than starting date"
      )
      .required("Ending date is required"),
  });

  return (
    <div className="w-full bg-white">
      {showModal && (
        <ConfirmModal
          negativeAction={toggleModal}
          positiveAction={saveCategory}
          title="Confirm Creation"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll ">
        {/* Top Section */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl mb-2 ">Create cateogory offer</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Category List", "Create Category offer"]}
            />
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
        <div className="admin-div">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={showConfirm}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form className="lg:flex w-full gap-5">
                <div className="lg:w-2/3">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="title"
                      className="admin-label font-bold mt-3"
                    >
                      Category Title
                    </label>
                    <Field
                      name="title"
                      placeholder="Type the category title here"
                      className="admin-input p-2 rounded border border-violet-600  hover:border-black
                        "
                    />
                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="title"
                      component="span"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="description"
                      className="admin-label mt-4 font-bold"
                    >
                      Category Description
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      className="admin-input h-56 px-3 rounded border border-violet-600  hover:border-black placeholder:mt-4"
                      placeholder="Type the category description here"
                    />
                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="description"
                      component="span"
                    />
                  </div>
                </div>
                <div className="lg:w-1/3 mb-3 lg:mb-0">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="title"
                      className="admin-label font-bold mt-3"
                    >
                      Category offer
                    </label>
                    <Field
                      name="offer"
                      placeholder="Type the category title here"
                      className="admin-input p-2 rounded border border-violet-600  hover:border-black
                        "
                    />
                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="offer"
                      component="span"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="title"
                      className="admin-label font-bold mt-3"
                    >
                      Offer starting Date
                    </label>
                    <Field
                      min={new Date()}
                      name="startingDate"
                      type="date"
                      placeholder="Type the category title here"
                      className="admin-input p-2 rounded border border-violet-600  hover:border-black
                        "
                    />
                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="startingDate"
                      component="span"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="title"
                      className="admin-label font-bold mt-3"
                    >
                      Offer Ending date
                    </label>
                    <Field
                      name="endingDate"
                      type="date"
                      placeholder="Type the category title here"
                      className="admin-input p-2 rounded border border-violet-600 hover:border-black"
                    />

                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="endingDate"
                      component="span"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;
