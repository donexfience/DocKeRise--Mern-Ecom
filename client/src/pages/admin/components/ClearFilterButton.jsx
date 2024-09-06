import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const ClearFilterButton = ({ removeFilters }) => {
  return (
    <button
      className="cursor-pointer bg-white hover:bg-gray-200 active:bg-gray-300 flex gap-2 pb-2 mt-2 items-center pt-2 rounded px-3 font-semibold text-violet-600"
      onClick={removeFilters}
    >
      <AiOutlineDelete />
      Clear Filters
    </button>
  );
};

export default ClearFilterButton;
