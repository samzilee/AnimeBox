import React, { useEffect, useState } from "react";
import { PiArrowLeft } from "react-icons/pi";

const Pagination = ({ paginationData, setPage, page }) => {
  const handlePagination = (event) => {
    if (event === "forword") {
      setPage((current) => {
        return current + 1;
      });
    } else {
      setPage((current) => {
        return current - 1;
      });
    }
  };
  if (!paginationData.totalPages) return;

  return (
    <ul className="flex justify-center items-center gap-3">
      <button
        className={`w-9 h-9 rounded-full bg-gray-600 font-bold text-[1.2rem] font-mono ${
          page === 1 ? " pointer-events-none opacity-[0.5]" : ""
        }`}
        onClick={() => handlePagination("back")}
      >
        <p>{"<"}</p>
      </button>

      <p className="font-sans">
        {page} / {paginationData.totalPages}
      </p>

      <button
        className={`w-9 h-9 rounded-full bg-gray-600 font-bold text-[1.2rem] font-mono ${
          paginationData.hasNextPage ? "" : " pointer-events-none opacity-[0.5]"
        }`}
        onClick={() => handlePagination("forword")}
      >
        <p>{">"}</p>
      </button>
    </ul>
  );
};

export default Pagination;
