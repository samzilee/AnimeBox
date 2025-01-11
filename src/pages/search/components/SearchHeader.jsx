import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assets/large.png";

const SearchHeader = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();

  return (
    <header className=" flex justify-between items-center p-2 sticky top-0 z-10 bg-gray-800">
      <Link to="/">
        <div className=" w-[5rem]">
          <img src={logo} alt="logo" className="size-full" />
        </div>
      </Link>
      <section className="flex-1 flex justify-center">
        <form
          className="flex w-[80%] h-[40px] items-center px-2 py-1 bg-gray-700 bg-opacity-[0.3] rounded-lg"
          onSubmit={() => {
            navigate(`/search?${searchText.split("/").join(" ")}`);
          }}
        >
          <Link to={`/search?${searchText.split("/").join(" ")}`}>
            <BiSearch className="text-[1.8rem]" />
          </Link>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent pl-1 outline-none  flex-1 mr-2"
          />
        </form>
      </section>
      <section className=" bg-gray-700 bg-opacity-[0.3] p-2 rounded-md cursor-not-allowed relative">
        <FiFilter className="text-[1.5rem] text-gray-600" />
      </section>
    </header>
  );
};

export default SearchHeader;
