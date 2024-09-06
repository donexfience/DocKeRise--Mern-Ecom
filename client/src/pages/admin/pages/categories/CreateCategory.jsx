import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCategory } from "../../../../redux/actions/admin/categoriesAction";
import ConfirmModal from "../../../../components/ConfirmModal";
import * as Yup from "yup";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CreateCategory = () => {
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
    const updatedFormData = new FormData();
    updatedFormData.append("name", value.title);
    updatedFormData.append("description", value.description);
    updatedFormData.append("imgURL", value.imageURL);
    setFormData(updatedFormData);
  };

  const saveCategory = () => {
    dispatch(createNewCategory(formData));
    toggleModal();
    navigate(-1);
  };

  const initialValues = {
    title: "",
    description: "",
    imageURL: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    imageURL: Yup.mixed()
      .required("File is required")
      .test(
        "fileType",
        "Unsupported File Format. Only JPEG or PNG is allowed.",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
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
            <h1 className="font-bold text-2xl mb-2 ">Create Category</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Category List", "Create Category"]}
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
                  <h1 className="font-bold mb-3">Product Thumbnail</h1>
                  <CustomSingleFileInput
                    onChange={(file) => {
                      setFieldValue("imageURL", file);
                    }}
                  />
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

export default CreateCategory;
