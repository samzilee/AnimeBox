import React from "react";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const Nav = ({ setSlideID }) => {
  const Increment = () => {
    setSlideID((currentValue) => {
      if (currentValue === 4) return 0;
      return currentValue + 1;
    });
  };

  const Decrement = () => {
    setSlideID((currentValue) => {
      if (currentValue === 0) return 4;
      return currentValue - 1;
    });
  };
  return (
    <>
      <button
        className="absolute z-10 left-[5px] top-[40%] w-[2.5rem] text-gray-200 opacity-[0.8]"
        onClick={Decrement}
      >
        <FaArrowCircleLeft className="size-full" />
      </button>
      <button
        className="absolute z-10 right-[5px] top-[40%] w-[2.5rem] text-gray-200 opacity-[0.8]"
        onClick={Increment}
      >
        <FaArrowAltCircleRight className="size-full" />
      </button>
    </>
  );
};

export default Nav;
