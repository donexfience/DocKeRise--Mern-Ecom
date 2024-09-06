import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import date from "date-and-time";
import StatusComponent from "../../../../components/StatusComponent";
import { useNavigate } from "react-router-dom";

const TableRow = ({ index, length, coupon }) => {
  const navigate = useNavigate();

  const isLast = index === length - 1;

  const classes = isLast ? "p-4" : "p-8 border";

  return (
    <tr
      className={`${classes} items-center hover:bg-gray-200 active:bg-gray-300 cursor-pointer py-6 px-5`}
    >
      <td className="admin-table-cell ps-9">{index + 1}</td>
      <td className="admin-table-cell ps-9">{coupon.code}</td>
      <td className="admin-table-cell ps-9 capitalize">{coupon.type}</td>
      <td className="admin-table-cell px-4">{coupon.value}</td>
      <td className="admin-table-cell py-2 ">
        <StatusComponent status={coupon.isActive ? "Active" : "Blocked"} />
      </td>
      <td className="admin-table-cell">
        {coupon.createdAt
          ? date.format(new Date(coupon.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-cell">
        {coupon.expirationDate
          ? date.format(new Date(coupon.expirationDate), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-cell ps-10">
        <div className="flex items-center gap-2 text-lg">
          <span
            className="hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`edit/${coupon._id}`);
            }}
          >
            <AiOutlineEdit />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
