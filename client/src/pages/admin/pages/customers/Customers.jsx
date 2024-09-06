import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../../../components/Modal";
import BlockOrUnblock from "./BlockOrUnblock";
import BreadCrumbs from "../../components/BreadCrumbs";
import { AiOutlinePlus } from "react-icons/ai";
import FilterArray from "../categories/FilterArray";
import SearchBar from "../../../../components/SearchBar";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../components/ClearFilterButton";
import Pagination from "../../../../components/Pagination";
import { getCustomers } from "../../../../redux/actions/admin/CustomerAction";
import TableRow from "./TableRow";
import axios from "axios";
import { URL } from "../../../../Common/api";

const Customers = () => {
  const dispatch = useDispatch();

  // const { customers, loading, error, totalAvailableUsers } = useSelector(
  //   (state) => state.customers
  // );

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const toggleBlockUnBlockModal = (data) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
    console.log("data inside the toggle",data)
  };

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [customers,setCustomers]=useState([])
  const [totalAvailableCustomers,setTotalAvailableCustomers]=useState("")

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
  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingDate");
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };
  const loadData = async () => {
    const { data } = await axios.get(
      `${URL}/admin/customers${searchParams && `?${searchParams}`}`
    );
    console.log(data,"///////////////")
    const customerData = data.customers
    const totalAvailableCustomers=data.totalAvailableUsers
    setCustomers(customerData);
    setTotalAvailableCustomers(totalAvailableCustomers);
  };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
    loadData();
  }, [searchParams]);
  useEffect(()=>{
    console.log(customers,"--------------")
  },[customers])
  return (
    <div className="w-full">
      {blockUnBlockModal && (
        <Modal
          content={
            <BlockOrUnblock
              toggleBlockOrUnBlockModal={toggleBlockUnBlockModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Customers</h1>
          <BreadCrumbs list={["Dahsboard", "Customers Lists"]} />
          <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={handleFilter}
          />
        </div>
      </div>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
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
        {}
        {customers && (
          <table className="w-full min-w-max table-auto">
            <thead className="font-normal">
              <tr className="border-b border-gray-200 text-violet-500">
                <th className="admin-table-head w-52">Name</th>
                <th className="admin-table-head">Email</th>
                <th className="admin-table-head">Phone No</th>
                <th className="admin-table-head">Status</th>
                <th className="admin-table-head">Joined</th>
                <th className="admin-table-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                const isLast = index === customers.length - 1;
                return (
                  <TableRow
                    isLast={isLast}
                    customer={customer}
                    key={index}
                    toggleBlockUnBlockModal={toggleBlockUnBlockModal}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="py-5">
        <Pagination
          handleClick={handleFilter}
          page={page}
          number={10}
          totalNumber={totalAvailableCustomers}
        />
      </div>
    </div>
  );
};

export default Customers;
