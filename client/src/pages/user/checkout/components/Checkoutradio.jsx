import React from "react";
import { AiFillDelete, AiFillEdit, AiOutlineEdit } from "react-icons/ai";

const Checkoutradio = ({
  selectedAddress,
  setSelectedAddress,
  setEditedAddress,
  item,
  toggleEditAddressModal,
  toggleDeleteAdressModal,
}) => {
    console.log(item,"------------")
    const selected = selectedAddress === item._id;
    console.log(selected)
  

  return (
    <div
      className={ ` shadow-slate-950 bg-white rounded my-1 py-2 px-4 cursor-pointer hover:bg-white flex justify-between${
        selected ? "  font-bold text-lg text-blue-500" : ""
      }`}
    >
      <div className="flex items-center">
        <p className="line-clamp-1">
          <span>
            <input
              type="radio"
              name="choosed"
              id="choosed"
              checked={selected}
              onChange={(e) => {
                setSelectedAddress(item._id);
              }}
            />
          </span>
          <span className=" ml-4 rounded-lg p-4 h-16">
            {item.firstName} {item.lastName}
              {" "}
              {item.address}
          </span>
        </p>
      </div>
      <div>
        <div className="flex gap-5 items-center justify-center">
          <AiFillEdit
            className="text-xl text-violet-500 hover:text-black"
            onClick={() => {
              setEditedAddress(item);
              toggleEditAddressModal();
            }}
          />
          <AiFillDelete
            className="text-xl text-violet-500 hover:text-black"
            onClick={(e) => toggleDeleteAdressModal(item._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkoutradio;
