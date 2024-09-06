import React, { useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlineSave, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import CustomSingleFileInput from "../../../../components/CustomSingleFileInput";
import CustomFileInput from "../../components/CustomFileInput";
import { updateProduct } from "../../../../redux/actions/admin/productAction";
import ConfirmModal from "../../../../components/ConfirmModal";
import axios from "axios";
import { URL } from "../../../../Common/api";
const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const [statusList, setStatusList] = useState([
    "draft",
    "published",
    "unpublished",
    "out of stock",
    "low quantity",
  ]);
  const [showConfirm, setShowConfirm] = useState(false);

  const [duplicateFetchData, setDuplicateFetchData] = useState({});
  const [fetchData, setFetchData] = useState({
    name: "",
    description: "",
    stockQuantity: 0,
    category: "",
    imageURL: "",
    status: "",
    attributes: [],
    price: "",
    markup: 0,
    moreImageURL: [],
    offer: 0,
  });
  //confirrmation
  console.log("edit product already existed data", fetchData);
  const toggleConfirm = () => {
    if (newThumbnail === "" && fetchData.imageURL === "") {
      toast.error("Please upload a thumbnail image");
      return;
    }
    if (newMoreImage.length < 1 && fetchData.moreImageURL.length < 1) {
      toast.error("Please upload at least one additional image");
      return;
    }
    if (fetchData?.offer && fetchData?.offer < 0) {
      toast.error("Offer can't be less than 0");
      return;
    } else if (fetchData?.offer && fetchData?.offer > 100) {
      toast.error("offer can't be above below 100");
    } else if (fetchData?.price && fetchData?.price < 1) {
      toast.error("price must be greater than 0");
    } else if (fetchData?.stockQuantity && fetchData.stockQuantity < 1) {
      toast.error("stock must be greater than 0");
    } else {
      setShowConfirm(!showConfirm);
    }
  };
  const handleInputChange = (e) => {
    console.log(e.target.value, e.target.name, "--------------------------");
    const { name, value } = e.target;
    setFetchData({ ...fetchData, [name]: value });
  };

  //  image handling
  const [newThumbnail, setNewThumbnail] = useState("");
  const handleSingleImageInput = (image) => {
    setNewThumbnail(image);
  };
  // Fetching The product details initially
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`${URL}/admin/product/${id}`, {
          withCredentials: true,
        });
        setFetchData({ ...data.product });
        setDuplicateFetchData({ ...data.product });
      } catch (error) {
        console.log(error, "error in setting data");
      }
    };
    getProductDetails();
  }, []);

  const [attributName, setAttributName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributeHighlight, setAttributeHighlight] = useState(false);
  const [status, setStatus] = useState("");

  //attributes handling

  const attributeHandler = (e) => {
    e.preventDefault();
    if (attributName.trim() === "" || attributeValue.trim() === "") {
      return;
    }
    const attribute = {
      name: attributName,
      value: attributeValue,
      isHighlight: attributeHighlight,
    };
    setFetchData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, attribute],
    }));
    setAttributeHighlight(false);
    setAttributName("");
    setAttributeValue("");
  };
  const handleAttributeChange = (index, attributeName, value) => {
    setFetchData((prevData) => {
      const updatedAttributes = [...prevData.attributes];
      updatedAttributes[index] = {
        ...updatedAttributes[index],
        [attributeName]: value,
      };
      return {
        ...prevData,
        attributes: updatedAttributes,
      };
    });
  };

  //deleting the attributes

  const handleDeleteAttribute = (index) => {
    setFetchData((prevData) => {
      const updatedAttributes = [...fetchData?.attributes];
      updatedAttributes.splice(index, 1);
      return {
        ...prevData,
        attributes: updatedAttributes,
      };
    });
  };

  //deleteOneImgage

  const deleteOneProductImage = (index) => {
    const updatedImages = [...fetchData.moreImageURL];
    updatedImages.splice(index, 1); // Remove the image at the specified index
    setFetchData({
      ...fetchData,
      ["moreImageURL"]: updatedImages, // Update the state with the new array of images
    });
  };

  const [newMoreImage, setNewMoreImage] = useState([]);

  const handleMultipleImageInput = (files) => {
    setNewMoreImage(files);
  };
  // for (const pair of FormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  const handleSave = () => {
    const data = {};

    for (const key in fetchData) {
      if (duplicateFetchData[key] !== fetchData[key]) {
        if (key === "attributes") {
          data["attributes"] = JSON.stringify(fetchData.attributes);
        } else if (key === "moreImageURL" && Array.isArray(fetchData[key])) {
          data["moreImageURL"] = fetchData[key];
        } else {
          data[key] = fetchData[key];
        }
      }
    }

    // Add newMoreImage if it exists
    if (newMoreImage.length > 0) {
      data["moreImageURL"] = newMoreImage;
    }

    // Add newThumbnail if it exists
    if (newThumbnail) {
      data["imageURL"] = newThumbnail;
    }
    console.log("🚀 ~ file: EditProduct.jsx:178 ~ handleSave ~ data:", data);

    dispatch(updateProduct({ id: id, data: data }));
    navigate(-1);
  };

  return (
    <div className="w-full bg-gray-100 pb-5">
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
            <h1 className="font-bold text-2xl mb-2 ">Edit Product</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs list={["Dashboard", "Product", "Edit Product"]} />
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
        {/* Product Information */}
        <div className="lg:flex  ">
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
                  value={fetchData?.name || ""}
                  onChange={handleInputChange}
                />
                <p className="admin-label font-semibold">Description</p>
                <textarea
                  name="description"
                  className="admin-input h-56 px-3 rounded  hover:border-black placeholder:mt-4 w-full
                  "
                  value={fetchData?.description || ""}
                  onChange={handleInputChange}
                />
                <p className="admin-label font-semibold">Quantity</p>
                <input
                  type="text"
                  name="stockQuantity"
                  placeholder="Type the Quantity"
                  value={fetchData?.stockQuantity || ""}
                  onChange={handleInputChange}
                  className="admin-input p-2 rounded   hover:border-black w-full"
                />
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold mb-3">Product Thumbnail</h1>
                {fetchData?.imageURL ? (
                  <div>
                    <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
                      <div className="h-56">
                        <img
                          src={`${URL}/img/${fetchData?.imageURL}`}
                          alt="im"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <button
                        className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          setFetchData({
                            ...fetchData,
                            ["imageURL"]: "",
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <CustomSingleFileInput onChange={handleSingleImageInput} />
                )}
              </div>
            </div>
          </div>
          {/* 1st box ened */}
          <div className="lg:w-2/6">
            <h1 className="font-bold mt-2">Product pricing</h1>
            <p className="font-bold mt-2">Price</p>
            <input
              type="number"
              name="price"
              placeholder="Type product name here"
              className="admin-input p-2 rounded  hover:border-black w-full"
              value={fetchData?.price || ""}
              min={1}
              max={99}
              onChange={handleInputChange}
            />
            <p className="admin-label font-semibold">Markup</p>
            <input
              type="number"
              name="markup"
              min={1}
              max={99}
              placeholder="Type product markup here"
              className="admin-input p-2 rounded  hover:border-black w-full"
              value={fetchData?.markup || ""}
              onChange={handleInputChange}
            />
            <p className="admin-label font-semibold">Offer</p>
            <input
              type="number"
              name="offer"
              placeholder="Type product offer here"
              className="admin-input p-2 rounded  hover:border-black w-full"
              value={fetchData?.offer || ""}
              min={1}
              max={99}
              onChange={handleInputChange}
            />
            <div className="category mt-12">
              <p className="admin-label font-semibold">Category</p>
              <p className="admin-label font-semibold mt-2">product category</p>
              <select
                name="category"
                id="categories"
                className="admin-input p-2 rounded  hover:border-black w-full"
                value={fetchData?.category || ""}
                onChange={handleInputChange}
              >
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
                className="admin-input p-2 rounded  hover:border-black w-full"
                value={fetchData?.status || ""}
                onChange={handleInputChange}
              >
                {statusList.map((st, index) => (
                  <option key={index} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Right ending */}
        </div>
        <div className="admin-div">
          <h1 className="font-bold">Product Images</h1>
          {fetchData.moreImageURL && fetchData.moreImageURL.length > 0 ? (
            <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
              <div className="flex flex-wrap   gap-3 justify-center">
                {fetchData.moreImageURL.map((img, index) => (
                  <div
                    className="bg-white p-2 rounded-lg shadow-lg mb-2 w-28 h-28 relative"
                    key={index}
                  >
                    <img
                      src={`${URL}/img/${img}`}
                      alt="img"
                      className="h-full w-full object-contain"
                    />
                    <button
                      onClick={() => deleteOneProductImage(index)}
                      className="absolute -top-2 -right-2 text-xl p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  setFetchData({
                    ...fetchData,
                    ["moreImageURL"]: [],
                  })
                }
              >
                Delete All
              </button>
            </div>
          ) : (
            <>
              <p className="admin-label my-2">Drop Here</p>

              <CustomFileInput onChange={handleMultipleImageInput} />
            </>
          )}
        </div>
        {/* multi image div ending */}

        {/* attributes sections */}
        <div className="admin-div">
          <h1 className="font-bold mb-1 mt-3">Product Attributes</h1>
          <form
            className="flex flex-col lg:flex-row items-center gap-3"
            onSubmit={attributeHandler}
          >
            <input
              type="text"
              className="admin-input-no-m w-full py-1"
              placeholder="Name"
              value={attributName}
              onChange={(e) => setAttributName(e.target.value)}
            />
            <input
              type="text"
              className="admin-input-no-m w-full py-1"
              placeholder="Value"
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
              className="admin-button-fl w-full lg:w-auto bg-violet-700 rounded px-2 py-2 text-white cursor-pointer"
              value="Add"
            />
          </form>
          <table className="border mt-5 rounded-lg w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 w-2/6">Name</th>
                <th className="px-2 py-1 w-2/6">Value</th>
                <th className="px-2 py-1 w-1/6">Highlighted</th>
                <th className="px-2 py-1 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {fetchData?.attributes?.map((at, index) => (
                <tr key={index}>
                  <td className="px-2 py-1">
                    <input
                      className="admin-input-no-m w-full"
                      type="text"
                      value={at?.name}
                      onChange={(e) =>
                        handleAttributeChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      className="admin-input-no-m w-full"
                      type="text"
                      value={at?.value}
                      onChange={(e) =>
                        handleAttributeChange(index, "value", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      className="admin-input-no-m w-full"
                      type="checkbox"
                      checked={at?.isHighlight}
                      onChange={(e) => {
                        handleAttributeChange(
                          index,
                          "isHighlight",
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => handleDeleteAttribute(index)}
                      className="text-xl text-gray-500 hover:text-gray-800 active:text-black"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
