import { setDate } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts } from "../../../../redux/actions/admin/productAction";
import BreadCrumbs from "../../components/BreadCrumbs";
import FilterArray from "../categories/FilterArray";
import { AiOutlinePlus } from "react-icons/ai";
import SearchBar from "../../../../components/SearchBar";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../components/ClearFilterButton";
import JustLoading from "../../../../components/JustLoading";
import TableRow from "./TableRow";
import Pagination from "../../../../components/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, error, loading, totalAvailableProducts } = useSelector(
    (state) => state.products
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
    dispatch(getProducts(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Product</h1>
          <BreadCrumbs list={["Dahsboard", "Proudct Lists"]} />
          <FilterArray
            list={[
              "all",
              "draft",
              "published",
              "out of stock",
              "low quantity",
              "unpublished",
            ]}
            handleClick={handleFilter}
          />
        </div>
        <button
          className="flex items-center text-sm bg-violet-600 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out mr-4"
          onClick={() => navigate("create")}
        >
          <AiOutlinePlus className="mr-2" />
          Create New Product
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
          products && (
            <table className="w-full">
              <thead className="font-normal">
                <tr className="border-b border-gray-200 text-violet-500">
                  <th className="admin-table-head w-3/12">Name</th>
                  <th className="admin-table-head w-3/12">Description</th>
                  <th className="admin-table-head w-1/12">Category</th>
                  <th className="admin-table-head w-1/12">Quantity</th>
                  <th className="admin-table-head w-1/12">Price</th>
                  <th className="admin-table-head w-1/12">Status</th>
                  <th className="admin-table-head w-1/12">Added</th>
                  <th className="admin-table-head w-1/12">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over products here and render TableRow component */}
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    index={index}
                    length={products.length}
                    product={product}
                  />
                ))}
              </tbody>
            </table>
          )
        )}
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            page={page}
            number={10}
            totalNumber={totalAvailableProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
