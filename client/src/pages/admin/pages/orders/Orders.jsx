import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOrders } from "../../../../redux/actions/admin/orderAction";
import Modal from "../../../../components/Modal";
import BreadCrumbs from "../../components/BreadCrumbs";
import FilterArray from "../categories/FilterArray";
import SearchBar from "../../../../components/SearchBar";
import ClearFilterButton from "../../components/ClearFilterButton";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import OrderRow from "./OrderRow";
import Pagination from "../../../../components/Pagination";
import UpdateOrder from "./UpdateOrder";
import ExportModal from "./ExportModal";
import { FiDownload } from "react-icons/fi";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, orders, error, totalAvailableOrders } = useSelector(
    (state) => state.orders
  );

  //filtering states

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, SetSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOrderForUpdate, setSelectedOrderForUpdate] = useState(null);

  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdate = (data) => {
    console.log(data.status);
    if (data.status === "cancelled") {
      toast.error("can't Edit Product is canceled");
    } else if (data.status === "returned") {
      toast.error("Cannot Edit Returned Product");
      return;
    } else {
      setUpdateModal(!updateModal);
      setSelectedOrderForUpdate(data);
    }
  };

  //filter handling

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  //export toggle

  const [showExportModal, setShowExportModal] = useState(false);
  const toggleExportModal = () => {
    setShowExportModal(!showExportModal);
  };

  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingDate");
    SetSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, []);

  //Getting all Order at initial loading

  useEffect(() => {
    dispatch(getOrders(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <div className="w-full">
      {/* modal update status */}
      {updateModal && (
        <Modal
          content={
            <UpdateOrder
              toggleModal={toggleUpdate}
              datas={selectedOrderForUpdate}
              orders={orders}
            />
          }
        />
      )}
      {showExportModal && (
        <Modal content={<ExportModal toggleExportModal={toggleExportModal} />} />
      )}
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Orders</h1>
          <BreadCrumbs list={["Dahsboard", "Orders Lists"]} />
          <FilterArray
            list={[
              "all",
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "returned",
            ]}
            handleClick={handleFilter}
          />
        </div>
        <div className="flex gap-1 mr-3 ">
          <button
            className="bg-violet-500 px-3 mr-4 py-2 rounded-md text-white"
            onClick={() => navigate("return-orders")}
          >
            Return requests
          </button>
          <div className="flex gap-3">
            <button
              className="admin-btn bg-violet-500 active:bg-red-400  flex px-3 items-center rounded gap-2 text-white"
              onClick={toggleExportModal}
            >
              <FiDownload />
              Export
            </button>
          </div> 
        </div>
      </div>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={SetSearch}
        />
      </div>
      <div className="flex my-2 gap-5 mb-8">
        <RangeDatePicker
          handleFilter={handleFilter}
          startingDate={startingDate}
          setStartingDate={setStartingDate}
          endingDate={endingDate}
          setEndingDate={setEndingDate}
        />
        <ClearFilterButton removeFilters={removeFilters} />
      </div>
      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg ml-5 mr-5 mt-3">
        <table className="w-full min-w-max table-auto">
          <thead className="font-normal">
            <tr className="text-violet-500">
              <th className="admin-table-head w-52">SI NO</th>
              <th className="admin-table-head ">Product</th>
              <th className="admin-table-head">Order Date</th>
              <th className="admin-table-head">Customer</th>
              <th className="admin-table-head">Total</th>
              <th className="admin-table-head">Delivery Date</th>
              <th className="">Status</th>
              <th className="admin-table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast ? "p-4" : "p-4 ";
              const adindex = (page - 1) * 10 + index + 1;

              return (
                <OrderRow
                  index={adindex}
                  item={item}
                  toggleUpdateModal={toggleUpdate}
                  key={index}
                  classes={classes}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="py-7">
        <Pagination
          handleClick={handleFilter}
          number={10}
          page={page}
          totalNumber={totalAvailableOrders}
        />
      </div>
    </div>
  );
};

export default Orders;
