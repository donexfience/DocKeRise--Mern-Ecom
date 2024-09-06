import React from "react";

const SortButton = ({ sort, handleClick }) => {
  const handleChange = (sort, value) => {
    handleClick(sort, value);
  };

  return (
    <div className="{shrink-0 flex gap-2 items-center}">
      <p className="shrink-0 pt-3 text-white ">Sort By :</p>
      <select
        className="border text-black shadow-lg shadow-xd py-3 px-2 rounded-lg font-bold "
        onChange={(e) => {
          handleChange("sort", e.target.value);
        }}
      >
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="created-desc"
        >
          New arrivals
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="price-asc"
        >
          Price Low to High
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="price-desc"
        >
          Price High to Low
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="popular"
        >
          Popularity
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="averagerating"
        >
          Average ratings
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="featured"
        >
          Featured
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="name-dsc"
        >
          z-a
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="name-asc"
        >
          a-z
        </option>
      </select>
    </div>
  );
};

export default SortButton;
