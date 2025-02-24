import React from "react";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const Nav = ({ setSlideID, animeList }) => {
  const Increment = () => {
    setSlideID((currentValue) => {
      if (currentValue === animeList.length - 1) return 0;
      return currentValue + 1;
    });
  };

  const Decrement = () => {
    setSlideID((currentValue) => {
      if (currentValue === 0) return animeList.length - 1;
      return currentValue - 1;
    });
  };
  return (
    <div className=" absolute z-20 md:z-[1] w-full top-[40%] flex justify-between px-2 md:w-fit md:right-[5px] md: md:bottom-[-120px] md:flex-col md:justify-center md:gap-2 ">
      <button
        className="w-[2.5rem] text-gray-200 opacity-[0.8] "
        onClick={Decrement}
      >
        <FaArrowCircleLeft className="size-full" />
      </button>

      <button
        className=" w-[2.5rem] text-gray-200 opacity-[0.8]"
        onClick={Increment}
      >
        <FaArrowAltCircleRight className="size-full" />
      </button>
    </div>
  );
};

export default Nav;
