import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewCategory,
  updateCategory,
} from "../../../../redux/actions/admin/categoriesAction";
import ConfirmModal from "../../../../components/ConfirmModal";
import * as Yup from "yup";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { URL } from "../../../../Common/api";
import axios from "axios";
const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [formData, setFormData] = useState(new FormData());

  const showConfirm = (value) => {
    toggleModal();
    console.log(value,"ooooooooooooooooooooo")
    const updatedFormData = new FormData();
    updatedFormData.append("name", value.title);
    updatedFormData.append("description", value.description);
    updatedFormData.append("imgURL", value.imageURL);
    updatedFormData.append("isActive", value.isActive);
    setFormData(updatedFormData);
  };

  const saveCategory = () => {
    dispatch(updateCategory({id,formData}));
    toggleModal();
    navigate(-1);
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    imageURL: null,
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    imageURL: Yup.mixed().required("File is required"),
  });
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await axios.get(`${URL}/admin/category/${id}`);
        const category = response.data.category;
        console.log("Category from API:", category);
        setInitialValues({
          title: category.name,
          description: category.description,
          imageURL: category.imgURL, 
          isActive: category.isActive, 
        });
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };
    loadInitialData();
  }, [id]);

  return (
    <div className="w-full bg-gray-100 ">
      {showModal && (
        <ConfirmModal
          negativeAction={toggleModal}
          positiveAction={saveCategory}
          title="Confirm Creation?"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll text-sm ">
        {/* Top Bar */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Edit Category</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Category List", "Edit Category"]}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="admin-button-fl flex gap-2  py-3 items-center rounded-lg bg-violet-600 px-4 text-white"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              type="button"
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
        {/* Category Information */}
        <div className="admin-div w-full">
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
                      className="admin-input p-2 rounded bg-white  hover:border-black
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
                      className="admin-input h-56 px-3 rounded   hover:border-black placeholder:mt-4"
                      placeholder="Type the category description here"
                    />
                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="description"
                      component="span"
                    />
                    <p>
                      <label
                        htmlFor="IsActive"
                        className="admin-label font-semibold"
                      >
                        Is Active
                      </label>
                    </p>
                    <Field
                      as="select"
                      name="isActive"
                      className="capitalize admin-input  my-2 py-2"
                    >
                      <option value={true}>active</option>
                      <option value={false}>block</option>
                    </Field>
                    <ErrorMessage
                      name="isActive"
                      component="div"
                      className="text-red-500"
                    />
                    <p></p>
                  </div>
                </div>
                <div className="lg:w-1/3 mb-3 lg:mb-0">
                  <h1 className="font-bold mb-3">Product Thumbnail</h1>
                  {values.imageURL && typeof values.imageURL === "string" ? (
                    <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2 h-80">
                      <div className="h-56">
                        <img
                          src={`${URL}/img/${values.imageURL}`}
                          alt="asfa"
                          className="h-full w-full object-contain"
                        />
                        <button
                          className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                          onClick={() => setFieldValue("imageURL", null)}
                        >
                          Delete this
                        </button>
                      </div>
                    </div>
                  ) : (
                    <CustomSingleFileInput
                      onChange={(file) => {
                        setFieldValue("imageURL", file);
                      }}
                    />
                  )}

                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="imageURL"
                    component="span"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
