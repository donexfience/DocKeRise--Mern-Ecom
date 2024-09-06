import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import SearchBar from "../../../../components/SearchBar";
import BreadCrumbs from "../../components/BreadCrumbs";
import FilterArray from "./FilterArray";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import JustLoading from "../../../../components/JustLoading";
import Pagination from "../../../../components/Pagination";
import { format } from "date-fns";
import StatusComponent from "../../../../components/StatusComponent";
import { URL } from "../../../../Common/api";
import { FaMoneyBillWave } from "react-icons/fa";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loading, error, totalAvailableCategories } = useSelector(
    (state) => state.categories
  );

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

  useEffect(() => {
    dispatch(getCategories(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Category</h1>
          <BreadCrumbs list={["Dahsboard", "Cateogory Lists"]} />
          <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={handleFilter}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="flex items-center text-sm bg-violet-600 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out mr-4"
            onClick={() => navigate("create")}
          >
            <AiOutlinePlus className="mr-2" />
            Create New Category
          </button>
        </div>
      </div>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg ml-5 mr-5 mt-3">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          categories && (
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200 h-12 text-violet-400 mr-8">
                  <th className="admin-table-head ">Name</th>
                  <th className="admin-table-head">Description</th>
                  <th className="admin-table-head">Created</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => {
                  const isLast = index === categories.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border ";

                  return (
                    <tr
                      key={index}
                      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer mr-6`}
                    >
                      <td className="admin-table-row flex items-center gap-2 font-semibold ml-8 mt-3">
                        <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                          {category.imgURL ? (
                            <img
                              src={`${URL}/img/${category.imgURL}`}
                              alt="img"
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                          )}
                        </div>

                        {category.name}
                      </td>
                      <td className="admin-table-row p-3 mt-2 ml-10 font-semibold overflow-x">
                        {category.description}
                      </td>
                      <td className="admin-table-row p-5 ml-6 font-semibold">
                        {category.createdAt
                          ? format(new Date(category.createdAt), "MMM dd yyyy")
                          : "No Data"}
                      </td>
                      <td>
                        {console.log(category.isActive, "00000000000")}
                        <StatusComponent
                          status={category.isActive ? "Active" : "Blocked"}
                        />
                      </td>
                      <td className="admin-table-row">
                        <div className="flex items-center gap-2 text-lg">
                          <span
                            className="hover:text-gray-500"
                            onClick={() => navigate(`edit/${category._id}`)}
                          >
                            <AiOutlineEdit className="font-semibold" />
                          </span>
                          <span
                            className="hover:text-gray-500"
                            onClick={() =>
                              navigate(`create/offer/${category._id}`)
                            }
                          >
                            <FaMoneyBillWave />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}
      </div>
      <div className="py-5">
        <Pagination
          handleClick={handleFilter}
          page={page}
          number={10}
          totalNumber={totalAvailableCategories}
        />
      </div>
    </div>
  );
};

export default Categories;
