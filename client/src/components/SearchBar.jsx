import React from "react";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SearchBar = ({ handleClick, search, setSearch, placeholder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick("search", search);
    handleClick("page", "");
  };
  return (
    <div className="w-full">
      <form
        className="flex items-center bg-white py-2 shadow px-4 rounded-lg border-violet-500 hover:py-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="outline-none py-2 rounded w-full placeholder:text-xl text-violet-500"
          placeholder={placeholder || "search"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleClick("search", e.target.value);
          }}
        />
        {search ? (
          <button className="bg-black py-3 px-8 rounded-md"
            type="button"
            onClick={() => {
              handleClick("search", "");
              setSearch("");
            }}
          >
            <GrClose className="text-2xl text-gray-400 hover:text-gray-800" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleClick("search", search);
            }}
          >
            <BiSearch className="text-2xl text-violet-500  hover:text-gray-800" />
          </button>
        )}
      </form>
    </div>
  );
};
export default SearchBar;
