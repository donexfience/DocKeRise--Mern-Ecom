import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import toast from "react-hot-toast";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";
import CustomFileInput from "../../components/CustomFileInput";
import { createProduct } from "../../../../redux/actions/admin/productAction";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

const AddProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [statusList, setStatusList] = useState([
    "Draft",
    "Published",
    "Unpublished",
    "Out of Stock",
    "Low Quantity",
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState();
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("Draft");
  const [attributes, setAttributes] = useState([]);
  const [price, setPrice] = useState("");
  const [markup, setMarkup] = useState("");
  const [moreImageURL, setMoreImageURL] = useState("");
  const [offer, setOffer] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributeHighlight, setAttributeHighlight] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleSingleImageInput = (img) => {
    setImageURL(img);
  };

  const handleMultipleImageInput = (files) => {
    setMoreImageURL(files);
  };
  console.log("moreimage", moreImageURL);
  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stockQuantity", stockQuantity);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("price", price);
    formData.append("markup", markup);
    formData.append("category", category);
    formData.append("offer", offer);
    formData.append("status", status.toLowerCase());

    formData.append("imageURL", imageURL);

    for (const file of moreImageURL) {
      console.log(file, "filessssssssssssssssssssssssss");
      formData.append("moreImageURL", file);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (stockQuantity <= 0) {
      toast.error("Quantity Should be greater than 0");
      return;
    }
    if (offer < 0) {
      toast.error("Offer should be greater than 0");
    }
    if (price <= 0) {
      toast.error("Price Should be greater than 0");
      return;
    }
    if (markup < 0) {
      toast.error("Markup Should be greater than 0");
      return;
    }
    if (imageURL.length === 0) {
      toast.error("Add the Thumbnail");
      return;
    }
    if (moreImageURL.length === 0) {
      toast.error("Add at least one image in Product images");
      return;
    }
    if (name.trim() == "") {
      toast.error("Name is required");
      return;
    }
    if (category === "undefined") {
      toast.error("cateogory is required");
      return;
    }
    dispatch(createProduct(formData));
    navigate(-1);
  };
  const attributeHandler = (e) => {
    e.preventDefault();
    if (attributeName.trim() === "" || attributeValue.trim() === "") {
      return;
    }
    let attribute = {
      name: attributeName,
      value: attributeValue,
      isHighlight: attributeHighlight,
    };
    console.log(attributeName, ":name");
    console.log(attributeValue, ":");
    console.log(attributeHighlight, ":");

    setAttributes([attribute, ...attributes]);
    console.log(attributes, "aaaaaaaaaaaaaaaaaaaa");
    setAttributeHighlight(false);
    setAttributeName("");
    setAttributeValue("");
  };

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <div className="w-full bg-gray-100 pb-20 ">
      {showConfirm && (
        <ConfirmModal
          positiveAction={handleSave}
          negativeAction={toggleConfirm}
          title="Confirm Creation"
        />
      )}
      <div className="p-5 w-full  ">
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl mb-2 ">Create Product</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs list={["Dashboard", "Product", "Create Product"]} />
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
              onClick={toggleConfirm}
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </div>
        <div className="lg:flex  ">
          {/* Product Information */}
          <div className="lg:w-4/6 lg:mr-5 ">
            <div className="admin-div lg:flex gap-5">
              <div className="lg:w-1/3 mb-3 lg:mb-0 ">
                <h1 className="font-bold mt-2">Product Information</h1>
                <p className="admin-input-heading font-semibold">Title</p>

                <input
                  type="text"
                  placeholder="Type product Name"
                  className="admin-input p-2 rounded  hover:border-black w-full"
                  name="name"
                  value={name}
                  maxLength={20}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="admin-label font-semibold">Description</p>
                <textarea
                  name="descriptioin"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="admin-input h-56 px-3 rounded  hover:border-black placeholder:mt-4 w-full"
                />
                <p className="admin-label font-semibold">Quantity</p>
                <input
                  type="number"
                  name="stockQuantity"
                  id="stockQuantity"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  placeholder="Type the Quantity"
                  className="admin-input p-2 rounded   hover:border-black w-full"
                />
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold mb-3">Product Thumbnail</h1>
                <CustomSingleFileInput onChange={handleSingleImageInput} />
              </div>
            </div>
            {/* 1st letf box ending */}
          </div>
          <div className="lg:w-2/6">
            <h1 className="font-bold mt-2">Product pricing</h1>
            <p className="font-bold mt-2">Price</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Type product price"
              className="admin-input p-2 rounded   hover:border-black w-full"
            ></input>

            <p className="admin-label font-semibold">Markup</p>
            <input
              type="number"
              name="markup"
              value={markup}
              placeholder="Type product Markup"
              onChange={(e) => setMarkup(e.target.value)}
              className="admin-input p-2 rounded  hover:border-black w-full"
            ></input>

            <p className="admin-label font-semibold">Offer</p>
            <input
              type="number"
              value={offer}
              min={1}
              max={100}
              name="offer"
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Type product offer"
              className="admin-input p-2 rounded  hover:border-black w-full"
            ></input>
            <div className="category mt-12">
              <p className="admin-label font-semibold">Category</p>
              <p className="admin-label font-semibold mt-2">product category</p>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="admin-input p-2 rounded   hover:border-black w-full"
              >
                <option value="">Choose a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <p className="admin-label font-semibold mt-2">product status</p>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="admin-input p-2 rounded  hover:border-black w-full"
              >
                {statusList.map((st, index) => (
                  <option key={index} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* outer div */}
        </div>
      </div>
      <div className="add multiple  ml-5 mr-8  overflow-auto">
        <h1 className="font-bold">Product Images</h1>
        <p className="admin-label my-2">Drop Here</p>
        <CustomFileInput onChange={handleMultipleImageInput} />

        {/* multi image div ending */}
      </div>
      <div className="attribute-div">
        <h1 className="font-bold mb-2 ml-5 mt-4">Product Attributes</h1>
        <form
          className="flex flex-col lg:flex-row items-center gap-3 ml-5 mr-6"
          onSubmit={attributeHandler}
        >
          <input
            type="text"
            placeholder="Name"
            className="admin-input p-2 rounded hover:border-black w-full"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="value"
            className="admin-input p-2 rounded   hover:border-black w-full"
            value={attributeValue}
            onChange={(e) => setAttributeValue(e.target.value)}
          />
          <div className="admin-input-no-m w-full lg:w-auto shrink-0">
            <input
              type="checkbox"
              checked={attributeHighlight}
              onChange={() => setAttributeHighlight(!attributeHighlight)}
            />{" "}
            Highlight
          </div>
          <input
            type="submit"
            className="admin-button-fl w-full lg:w-auto bg-violet-700 text-white cursor-pointer p-2 rounded"
            value="Add"
          />
        </form>
        <div className="border mt-5 rounded-lg">
          {attributes.map((at, index) => {
            return (
              <div
                key={index}
                className={`flex px-2 py-1 ${
                  index % 2 === 0 && "bg-gray-200 border border-violet-500"
                } ml-5 mr-6`}
              >
                <p className="w-2/6 mr-3 bg-white px-3">{at.name}</p>
                <p className="w-3/6 bg-white mr-4 px-3">{at.value}</p>
                <p className="w-1/6 bg-white px-3 ">
                  {at.isHighlight ? "Highlighted" : ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* outermost div */}
    </div>
  );
};

export default AddProducts;
