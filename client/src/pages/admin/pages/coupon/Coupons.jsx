import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCoupons } from "../../../../redux/actions/admin/couponAction";
import BreadCrumbs from "../../components/BreadCrumbs";
import FilterArray from "../categories/FilterArray";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../../components/SearchBar";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../components/ClearFilterButton";
import Pagination from "../../../../components/Pagination";
import TableRow from "./TableRow";
import JustLoading from "../../../../components/JustLoading";

const Coupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coupons, error, loading, totalAvailableCoupons } = useSelector(
    (state) => state.coupons
  );

  //filtering  tools
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

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
  //removing the filters that i added
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingData");
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams("");
  };
  useEffect(() => {
    dispatch(getCoupons(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Coupons</h1>
          <BreadCrumbs list={["Dahsboard", "Coupon Lists"]} />
          <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={handleFilter}
          />
        </div>
        <button
          className="flex items-center text-sm bg-violet-600 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out mr-4"
          onClick={() => navigate("create")}
        >
          <AiOutlinePlus className="mr-2" />
          Create New Coupons
        </button>
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
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <JustLoading size={10} />
          </div>
        ) : (
          coupons && (
            <table className="w-full">
              <thead className="font-normal">
                <tr className=" text-violet-500">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head">Code</th>
                  <th className="admin-table-head">Type</th>
                  <th className="admin-table-head">Value</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Created On</th>
                  <th className="admin-table-head">Expiry</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over coupons here and render TableRow component */}
                {coupons.map((item, index) => {
                  return (
                    <TableRow
                      coupon={item}
                      key={index}
                      index={index}
                      length={coupons.length}
                    />
                  );
                })}
              </tbody>
            </table>
          )
        )}
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            page={page}
            number={10}
            totalNumber={totalAvailableCoupons}
          />
        </div>
      </div>
    </div>
  );
};

export default Coupons;
