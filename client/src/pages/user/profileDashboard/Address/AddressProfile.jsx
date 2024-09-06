import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const AddressProfile = ({ item, setEditAddress, toggleDelete, toggleEdit }) => {
  return (
    <div
      className={` border-2 rounded my-1 py-2 px-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center `}
    >
      <p className="line-clamp-1">
        <span className="font-semibold">
          {item.firstName} {item.lastName},
        </span>{" "}
        {item.address}
      </p>
      <div className="flex ml-5 gap-5">
        <AiOutlineEdit
          className="hover:text-gray-500"
          onClick={() => {
            setEditAddress(item);
            toggleEdit();
          }}
        />
        <AiOutlineDelete
          onClick={() => toggleDelete(item._id)}
          className="hover:text-gray-500"
        />
      </div>
    </div>
  );
};

export default AddressProfile;
