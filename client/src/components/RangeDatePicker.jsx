import React, { useState, useRef, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { DayPicker } from "react-day-picker";
import { format, isAfter } from "date-fns";

const RangeDatePicker = ({
  handleFilter,
  startingDate,
  setStartingDate,
  endingDate,
  setEndingDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState(""); // Changed from "Range" to "range"
  const datePickerRef = useRef(null);
  const today = new Date();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startDate = params.get("startingDate");
    const endDate = params.get("endingDate");
    if (startDate) {
      setStartingDate(startDate);
      handleFilter("startingDate", startDate);
    }
    if (endDate) {
      setEndingDate(endDate);
      handleFilter("endingDate", endDate);
    }
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div
      className="ml-3 relative flex items-center justify-center"
      ref={datePickerRef}
    >
      <button
        onClick={toggleDatePicker}
        className="cursor-pointer bg-white hover:bg-gray-200 active:bg-gray-300 flex gap-2 pb-2 mt-2 items-center pt-2 rounded px-3 font-semibold text-violet-600"
      >
        <AiOutlineCalendar />
        {startingDate || endingDate
          ? `${startingDate || "From"} to ${endingDate || "To"}`
          : "Select Date "}
      </button>
      {showDatePicker && (
        <div className=" bg-white px-5 py-5 rounded-lg shadow-2xl absolute right-0 top-10 text-sm">
          <DayPicker
            className="px-5 py-4"
            defaultMonth={new Date()}
            mode="range"
            selected={range}
            showOutsideDays
            disabled={(date) => isAfter(date, today)}
            onSelect={(date) => {
              setRange(date); 
              if (date && date.from) {
                setStartingDate(format(new Date(date.from), "yyyy-MM-dd"));
              }
              if (date && date.to) {
                setEndingDate(format(new Date(date.to), "yyyy-MM-dd"));
              }
            }}
          />
          <div className="flex gap-2">
            <button
              className="bg-violet-600 rounded px-2 py-2 text-white w-full"
              onClick={() => {
                toggleDatePicker();
                handleFilter("startingDate", startingDate);
                handleFilter("endingDate", endingDate);
              }}
            >
              Save
            </button>
            <button
              className="border  text-red-500 w-full"
              onClick={() => {
                setStartingDate("");
                setEndingDate("");
                toggleDatePicker();
                setRange(""); // Changed from "setSelectedRange" to "setRange"
                handleFilter("startingDate", "");
                handleFilter("endingDate", "");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RangeDatePicker;
