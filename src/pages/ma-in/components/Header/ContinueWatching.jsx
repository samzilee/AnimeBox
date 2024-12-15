import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ContinueWatching = ({ continueWatch }) => {
  let localValuePath = localStorage.getItem("continueWatching");
  if (!localValuePath) return;
  if (!continueWatch) return;

  const FixlocalValue = localValuePath.slice(10).split("-episode-");
  const [showCon, setShowCon] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCon(true);
    }, 2000);

    setTimeout(() => {
      setShowCon(false);
    }, 10000);
  }, []);

  return (
    <div
      className={` fixed w-[250px] h-[80px] right-0 bg-gray-700 bottom-5 rounded-l-2xl flex cursor-pointer transition-all duration-[0.5s] z-50 ${
        showCon ? "" : "translate-x-[100%]"
      }`}
    >
      <div className="h-full w-[70px] py-2 pl-2">
        <img
          src={continueWatch.image}
          alt={continueWatch.title}
          className="size-full object-cover rounded-xl"
        />
      </div>
      <div className="text-[0.5rem] flex-1  py-2 pl-2">
        <p>{continueWatch.title}</p>
        <p className="text-[0.6rem]">
          Episode <span>{FixlocalValue[1]}</span>
        </p>
        <Link
          to={localValuePath}
          className="text-[0.9rem] flex items-center gap-2"
        >
          Continue Watching{" "}
          <span className="text-[1rem]">
            <FiArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ContinueWatching;
