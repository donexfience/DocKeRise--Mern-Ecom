import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBestSellingCategory,
  getBestSellingProducts,
} from "../../../redux/actions/admin/AdminDashAction";
import BreadCrumbs from "../components/BreadCrumbs";
import { BiTag } from "react-icons/bi";
import JustLoading from "../../../components/JustLoading";
import StatusComponent from "../../../components/StatusComponent";
import { URL } from "../../../Common/api";
import { AiOutlineCalendar } from "react-icons/ai";
import { debounce } from "time-loom";
import OutSideTouchCloseComponent from "../../../components/OutSideTouchCloseComponent";
const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { BestsellingProduct, loading, error } = useSelector(
    (state) => state.BestsellingProduct
  );
  const { BestsellingCategory } = useSelector(
    (state) => state.BestsellingCategory
  );

  const [numberOfDates, setNumberOfDates] = useState(7);
  const [updateModal, setUpdateModal] = useState(false);
  console.log("bestSellingProduct", BestsellingProduct);
  console.log("bestSellingCategory", BestsellingCategory);
  useEffect(() => {
    dispatch(getBestSellingProducts());
    dispatch(getBestSellingCategory());
  }, []);
  //dropdown for button
  const [dropDown, setDropDown] = useState(false);
  const toggleDropdown = debounce(() => {
    setDropDown(!dropDown);
  }, 100);
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-between items-center font-semibold">
          <BreadCrumbs list={["Dashboard", "Admin Dashboard"]} />
        </div>
        <div>
          <div className="flex justify-between items-center ">
            <h1 className="font-bold ml-6 mt-4 text-xl">Admin Dashboard</h1>
            <div>
              <button
                className="bg-violet-500 text-white hover:bg-gray-200 rounded-md py-3 gap-4 flex items-center px-4 active:bg-gray-300 text-sm mr-4"
                onClick={toggleDropdown}
              >
                Last {numberOfDates} Days <AiOutlineCalendar />
              </button>
              {dropDown && (
                <OutSideTouchCloseComponent
                  toggleVisibility={toggleDropdown}
                  style="absolute top-10 right-0 font-normal w-44 bg-white rounded-lg shadow-2xl"
                >
                  <button
                    className="navbar-drop-ul w-full"
                    onClick={() => {
                      setNumberOfDates(7);
                      toggleDropdown();
                    }}
                  >
                    Last 7 Days
                  </button>
                  <button
                    className="navbar-drop-ul w-full"
                    onClick={() => {
                      setNumberOfDates(30);
                      toggleDropdown();
                    }}
                  >
                    Last 30 Days
                  </button>
                  <button
                    className="navbar-drop-ul w-full"
                    onClick={() => {
                      setNumberOfDates(180);
                      toggleDropdown();
                    }}
                  >
                    Last 180 Days
                  </button>
                  <button
                    className="navbar-drop-ul w-full"
                    onClick={() => {
                      setNumberOfDates(365);
                      toggleDropdown();
                    }}
                  >
                    Last 365 Days
                  </button>
                </OutSideTouchCloseComponent>
              )}
            </div>
          </div>
          {/* <div className="flex lg:flex-wrap gap-5 mb-5 e-1/4 p-3">
            <Char1 numberOfDates={numberOfDates} />
            <Chart2 numberOfDates={numberOfDates} />
            <Chart3 numberOfDates={numberOfDates} />
          </div> */}
        </div>
        <div className="w-full">
          <h1 className="font-bold ml-6 mt-4 text-xl">Best selling Products</h1>
          <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg ml-5 mr-5 mt-3">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <JustLoading size={10} />
              </div>
            ) : (
              BestsellingProduct && (
                <table className="w-full border-collapse">
                  <thead className="font-normal bg-white  border-b border-gray-200">
                    <tr className="text-violet-500">
                      <th className="admin-table-head py-2 w-2/12 text-center">
                        SI NO
                      </th>
                      <th className="admin-table-head py-2 w-2/12 text-center">
                        Name
                      </th>
                      <th className="admin-table-head w-1/12 text-center">
                        Quantity
                      </th>
                      <th className="admin-table-head w-1/12 text-center">
                        Price
                      </th>
                      <th className="admin-table-head w-1/12 text-center">
                        Status
                      </th>
                      <th className="admin-table-head w-2/12 text-center">
                        Stock Quantity
                      </th>
                      <th className="admin-table-head w-2/12 text-center">
                        Total Sales Count
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="shadow-md
              "
                  >
                    {BestsellingProduct.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 ">
                        <td className="px-6">{index + 1}</td>
                        <td className="py-2 px-4 flex items-center text-center gap-4">
                          <img
                            src={`${URL}/img/${item.productDetails[0].imageURL}`}
                            alt="img"
                            className="object-contain max-w-8 max-h-8"
                          />
                          {item.productDetails[0].name}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {item.productDetails[0].stockQuantity}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {item.productDetails[0].price}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <StatusComponent
                            status={item.productDetails[0].status}
                          />
                        </td>
                        <td className="py-2 px-4 text-center">
                          {item.productDetails[0].stockQuantity}
                        </td>

                        <td className="py-2 px-4 text-center">
                          {item.totalQuantitySold}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center font-semibold"></div>
        <h1 className="mt-5 ml-5 font-bold text-2xl">Best selling Category</h1>
        <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg ml-5 mr-5 mt-3">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <JustLoading size={10} />
            </div>
          ) : (
            BestsellingCategory && (
              <table className="w-full border-collapse shadow-lg">
                <thead className="font-normal bg-white  border-b border-gray-200">
                  <tr className="text-violet-500">
                    <th className="admin-table-head py-2 w-2/12 text-center">
                      SI NO
                    </th>
                    <th className="admin-table-head py-2 w-2/12 text-center">
                      Name
                    </th>
                    <th className="admin-table-head w-1/12 text-center">
                      description
                    </th>

                    <th className="admin-table-head w-1/12 text-center">
                      Status
                    </th>
                    <th className="admin-table-head w-2/12 text-center">
                      Total Sales Count
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="shadow-md
              "
                >
                  {BestsellingCategory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 ">
                      <td className="px-20">{index + 1}</td>
                      <td className="py-2 px-12 flex items-center text-center gap-8">
                        <img
                          src={`${URL}/img/${item._id.imgURL}`}
                          alt="img"
                          className="object-contain max-w-8 max-h-8"
                        />
                        {item._id.name}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item._id.description}
                      </td>
                      <td className="py-2 px-28 text-center">
                        <StatusComponent
                          status={item._id.isActive ? "Active" : "Blocked"}
                        />
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item.totalQuantitySold}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
