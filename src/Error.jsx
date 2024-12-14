import React from "react";
import { FaSadTear } from "react-icons/fa";

const Error = () => {
  return (
    <div className="Hfooter h-[500px] flex flex-col justify-center relative md:h-screen  items-center">
      <div className="w-[100px] text-blue-400 flex flex-col items-center">
        <FaSadTear className="size-full" />
        <p className="text-[1.2rem]">Disconnected</p>
      </div>
    </div>
  );
};

export default Error;
