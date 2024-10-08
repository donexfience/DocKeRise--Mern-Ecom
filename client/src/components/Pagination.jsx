import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const   Pagination = ({ handleClick, page, number, totalNumber }) => {
  console.log("hello from pagination")
  let paginationNum = Math.ceil(totalNumber / number);
  const maxVisibleButtons = 5; 

  const renderPaginationNumber = () => {
    const paginationButtons = [];

    if (paginationNum > maxVisibleButtons) {
      const leftBoundary = Math.max(
        page - Math.floor(maxVisibleButtons / 2),
        1
      );
      const rightBoundary = Math.min(
        leftBoundary + maxVisibleButtons - 1,
        paginationNum
      );

      if (leftBoundary > 1) {
        paginationButtons.push(
          <p key="ellipsis-left" className="pagination-dots font-semibold">
            ...
          </p>
        );
      }

      const additionalPagesNeeded =
        maxVisibleButtons - (rightBoundary - leftBoundary + 1);

      for (
        let i = leftBoundary - additionalPagesNeeded;
        i <= rightBoundary;
        i++
      ) {
        paginationButtons.push(
          <p
            className={`pagination${page === i ? "-active" : ""}`}
            onClick={() => handleClick("page", i)}
            key={i}
          >
            {i}
          </p>
        );
      }

      if (rightBoundary < paginationNum) {
        paginationButtons.push(
          <p key="ellipsis-right" className="pagination-dots">
            ...
          </p>
        );
      }
    } else {
      for (let i = 1; i <= paginationNum; i++) {
        paginationButtons.push(
          <p
            className={`pagination${page === i ? "-active" : "text-red-500"} font-bold border-2 text-black border-violet-600  py-1 px-3 rounded-3xl`}
            onClick={() => handleClick("page", i)}
            key={i}
          >
            {i}
          </p>
        );
      }
    }

    return paginationButtons;
  };

  return (
    <div className="flex gap-2 justify-center items-center mr-3">
      {paginationNum > maxVisibleButtons && (
        <p
          className="pagination-arrows mt-4"
          onClick={() => {
            if (page > 1) {
              handleClick("page", 1);
            } else {
              toast.error("Already on the first page");
            }
          }}
        >
          <AiOutlineDoubleLeft />
        </p>
      )}
      {paginationNum > 1 && (
        <p
          className="pagination-arrows"
          onClick={() => {
            if (page > 1) {
              handleClick("page", page - 1);
            } else {
              toast.error("Can't go below one");
            }
          }}
        >
          <BsArrowLeft />
        </p>
      )}
      {paginationNum > 1 && renderPaginationNumber()}
      {paginationNum > 1 && (
        <p
          className="pagination-arrows"
          onClick={() => {
            if (page < paginationNum) {
              handleClick("page", page + 1);
            } else {
              toast.error("Page End");
            }
          }}
        >
          <BsArrowRight />
        </p>
      )}
      {paginationNum > maxVisibleButtons && (
        <p
          className="pagination-arrows"
          onClick={() => {
            if (page < paginationNum) {
              handleClick("page", paginationNum);
            } else {
              toast.error("Already on the last page");
            }
          }}
        >
          <AiOutlineDoubleRight />
        </p>
      )}
    </div>
  );
};

export default Pagination;
