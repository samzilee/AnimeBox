import React, { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Section2 = ({ NowShowing }) => {
  const [move, setMove] = useState(false);

  useEffect(() => {
    if (!NowShowing) return;
    setMove(true);
    const TimeOut = setTimeout(() => {
      setMove(false);
    }, 500);
    return () => clearTimeout(TimeOut);
  }, [NowShowing]);

  if (!NowShowing || NowShowing === null) return;
  return (
    <footer
      className={` h-fit font-[arial] transition-all duration-[0.5s] ml-[0px] ${
        move === true ? "ml-[10px]" : ""
      }`}
    >
      <main className="text-white px-5 py-3">
        <header className="text-[1.5rem] font-bold mb-1">
          {NowShowing.title}
        </header>
        <div className="text-[0.9rem] mb-1 flex font-bold gap-1 text-gray-300">
          <p> {NowShowing.hasDub ? "Dub" : "No-Dub"} :</p>
          <p>{NowShowing.hasSub ? "Sub" : "No-Sub"}</p>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/${NowShowing.id}`}
            className="flex items-center gap-1 px-3 py-[1px] rounded-xl bg-blue-400 font-bold"
          >
            <BsPlayCircleFill className="w-[0.9rem]" />
            <p className="text-[0.9rem]">Play</p>
          </Link>
          <button className="flex items-center gap-1 px-3 py-[1px]  border-[2px] rounded-xl font-bold opacity-[0.5] cursor-not-allowed">
            <BiPlus /> <p className="text-[0.9rem]">My List</p>
          </button>
        </div>
      </main>
    </footer>
  );
};

export default Section2;
