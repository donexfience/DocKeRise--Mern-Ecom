import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { blockOrUnBlock } from "../../../../redux/actions/admin/CustomerAction";

const BlockOrUnblock = ({ toggleBlockOrUnBlockModal, data }) => {
  const { id, status } = data;
  console.log(id,status,"dataaaaaaaaaaaaaaaaa block")
  const disptach = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(
    status ? "active" : "blocked "
  );
  const handleSave = () => {
    if(selectedStatus=== ""){
        return;
    }
    console.log("selectedStatus now",selectedStatus)
    let isActive =selectedStatus==='active'
    console.log(isActive,"isactive fiinal value")
    disptach(blockOrUnBlock({ id, isActive })).then(() => toggleModal());
    
  };
  return (
    <div className=" bg-white p-5 rounded-lg">
      <div className="flex w-full justify-between">
        <h1 className="text-lg font-bold ">Block User</h1>
        <AiOutlineClose
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={() => toggleBlockOrUnBlockModal("")}
        />
      </div>
      <div className="flex gap-3 items-center my-2">
        <p className="py-5 shrink-0">Choose a Status</p>
        <select
          name="status"
          id="status"
          className="capitalize px-5 py-2 bg-gray-300 rounded-lg"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="active" className="capitalize">
            active
          </option>
          <option value="blocked" className="capitalize">
            blocked
          </option>
        </select>
      </div>
      <button
        className="bg-violet-600 py-3 px-3 rounded-md text-white uppercase w-full text-sm"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default BlockOrUnblock;
