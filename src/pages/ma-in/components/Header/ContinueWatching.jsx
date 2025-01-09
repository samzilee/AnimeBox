import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ContinueWatching = ({ continueWatch }) => {
  const [showCon, setShowCon] = useState(false);

  useEffect(() => {
    const showCon = setTimeout(() => {
      setShowCon(true);
    }, 2000);

    const hideCon = setTimeout(() => {
      setShowCon(false);
    }, 10000);

    return () => {
      clearTimeout(showCon);
      clearTimeout(hideCon);
    };
  }, []);

  if (!continueWatch) return;

  return (
    <Link
      to={`/watching/${continueWatch.episodeId}`}
      className={` fixed w-[250px] h-[80px] right-0 bg-gray-700 bottom-5 rounded-l-2xl flex cursor-pointer transition-all duration-[0.5s] z-50 ${
        showCon ? "" : "translate-x-[100%]"
      }`}
    >
      <div className="h-full w-[70px] py-2 pl-2">
        <img
          src={continueWatch.animeData.img}
          alt={continueWatch.animeData.name}
          className="size-full object-cover rounded-xl"
        />
      </div>
      <div className="flex-1  py-2 pl-2 flex flex-col justify-between">
        <div>
          <p className="text-[0.7rem]">
            {continueWatch.episodeName.length > 20
              ? continueWatch.episodeName.slice(0, 20) + "..."
              : continueWatch.episodeName}
          </p>
          <p className="text-[0.6rem]">
            Episode <span>{continueWatch.episodeNo}</span>
          </p>
        </div>

        <div className="text-[0.9rem] flex items-center gap-2">
          Continue Watching{" "}
          <span className="text-[1rem]">
            <FiArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ContinueWatching;
