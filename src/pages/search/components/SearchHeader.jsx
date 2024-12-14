import React, { useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { Form, Link } from "react-router-dom";
import logo from "../../../Assets/large.png";

const SearchHeader = ({ searchText, setSearchText }) => {
  const path = localStorage.getItem("prevPath");
  return (
    <header className=" flex justify-between items-center p-2">
      <Link to="/">
        <div className=" w-[5rem]">
          <img src={logo} alt="logo" className="size-full" />
        </div>
      </Link>
      <section className="flex-1 flex justify-center">
        <div className="flex w-[80%] h-[40px] items-center px-2 py-1 bg-gray-700 bg-opacity-[0.3] rounded-lg">
          <button>
            <BiSearch className="text-[1.5rem]" />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent pl-1 outline-none  flex-1 mr-2"
          />
        </div>
      </section>
      <section className=" bg-gray-700 bg-opacity-[0.3] p-2 rounded-md cursor-not-allowed relative">
        <FiFilter className="text-[1.5rem] text-gray-600" />
      </section>
    </header>
  );
};

export default SearchHeader;
