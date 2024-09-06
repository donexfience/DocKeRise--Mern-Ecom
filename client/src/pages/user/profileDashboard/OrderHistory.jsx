import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getOrders } from "../../../redux/actions/user/orderAction";
import JustLoading from "../../../components/JustLoading";
import StatusComponent from "../../../components/StatusComponent";
import date from "date-and-time";
import { BsArrowRight } from "react-icons/bs";
import Pagination from "../../../components/Pagination";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userOrders, loading, error, totalAvailableOrders } = useSelector(
    (state) => state.userOrders
  );
  const [page, setPage] = useState(1);
  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
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
    dispatch(getOrders(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNum = params.get("page");
    setPage(parseInt(pageNum) || 1);
  }, [searchParams]);
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg h-full mx-5 shadow-lg lg:mx-0">
        <div className="uppercase text-lg font-bold text-violet-500 px-5 py-3">
          Order Histroy
        </div>
        <div className="overflow-auto p-5">
          {loading ? (
            <JustLoading size={10} />
          ) : userOrders && userOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-sm shadow-lg">
                <thead>
                  <tr className="">
                    <td className="px-5 py-2 font-bold text-violet-400">
                      Product Name
                    </td>
                    <td className="px-5 py-2 font-bold text-violet-400">
                      orderd Date
                    </td>
                    <td className="px-5 py-2 font-bold text-violet-400">
                      Status
                    </td>
                    <td className="px-5 py-2 font-bold text-violet-400">
                      Total
                    </td>
                    <td className="px-5 py-2 font-bold text-violet-400">
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {userOrders &&
                    userOrders.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="flex items-center px- 6 py-2 font-semibold">
                            <p
                              className="w-60 line-clamp-1 ml-3 font-semibold
                          "
                            >
                              {item.products[0].productId.name}{" "}
                            </p>
                            <p className="text-gray-500 font-normal">
                              ({item.totalQuantity}) products
                            </p>
                          </td>
                          <td className="px-5">
                            {date.format(
                              new Date(item.createdAt),
                              "DD MM YYYY"
                            )}
                          </td>
                          <td className=" py-2">
                            <StatusComponent status={item.status} />
                          </td>
                          <td className="px-6">{item.totalPrice}</td>
                          <td>
                            <Link
                              to={`detail/${item.orderId || item._id}`}
                              className="flex items-center gap-2 underline text-blue-500"
                            >
                              View order Details <BsArrowRight />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="font-bold flex items-center justify-center">
              No Orders found
            </div>
          )}
          <Pagination
            handleClick={handleFilter}
            number={10}
            page={page}
            totalNumber={totalAvailableOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
