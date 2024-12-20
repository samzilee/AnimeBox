import React, { useState } from "react";
import { BiBookmark } from "react-icons/bi";
import { BsPlayCircleFill, BsStarFill } from "react-icons/bs";
import { HiArrowSmallRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
const AnimeInfo = ({ animeData, animeId, availableEp }) => {
  const [Wordlength, setWordlength] = useState("short");

  const handleDis = () => {
    if (Wordlength === "short") {
      setWordlength("long");
      const mainAbout = document.getElementById("mainAbout");
      mainAbout.addEventListener("click", () => {
        setWordlength("short");
      });
      mainAbout.addEventListener("scroll", () => {
        setWordlength("short");
      });
    } else {
      setWordlength("short");
    }
  };

  if (!animeData) return;
  console.log(animeData);

  return (
    <main>
      <div className="p-4">
        <section className="flex justify-between items-center ">
          <p className="text-[1.2rem] font-semibold">
            {animeData.title_english || animeData.title}
          </p>
          <BiBookmark className="text-[1.3rem] md:text-[2rem] opacity-[0.5] cursor-not-allowed" />
        </section>

        <section className="flex flex-col md:flex-row  gap-5  md:items-center ">
          <div className="flex gap-5 items-center">
            <p className="font-semibold">
              Total Ep:{" "}
              <span className="text-gray-300">
                {animeData.episodes || "N/A"}
              </span>
            </p>

            <div className="flex items-center gap-2 text-[0.8rem]">
              <p className="flex items-center gap-2 text-blue-400">
                <BsStarFill />
                <span>{animeData.score || "N/A"}</span>
                <HiArrowSmallRight />
              </p>

              <p>{animeData.year || "N/A"}</p>
            </div>
            <div className="flex gap-2 text-blue-400">
              <p className="border-[1.5px]  border-blue-400 px-2 rounded-xl">
                {animeData.type}
              </p>
              <p className="border-[1.5px]  border-blue-400 px-2 rounded-xl">
                HD
              </p>
            </div>
          </div>
          <div className="flex gap-5 justify-center ">
            {!availableEp[0] ? (
              <button className="flex gap-1 justify-center items-center font-semibold px-10 py-1 rounded-full bg-blue-400 w-full opacity-[0.5] cursor-not-allowed">
                <BsPlayCircleFill className="text-[0.8rem]" />
                Play
              </button>
            ) : (
              <Link
                to={`/watching/${animeId}`}
                className="flex gap-1 justify-center items-center font-semibold px-10 py-1 rounded-full bg-blue-400 w-full"
              >
                <BsPlayCircleFill className="text-[0.8rem]" />
                Play
              </Link>
            )}
          </div>
        </section>

        <section className="mt-4">
          <section>
            <ul className="flex gap-1 text-[0.6rem] font-semibold">
              [
              {!animeData.genres[0]
                ? "N/A"
                : animeData.genres.map((genre) => {
                    return <li key={genre.name}>{genre.name}.</li>;
                  })}
              ]
            </ul>
          </section>
          <p className="text-[0.8rem] text-gray-200  md:w-[50%]">
            {animeData.synopsis
              ? animeData.synopsis.slice(0, 200)
              : "No Summary"}
            <span className="text-blue-400 cursor-pointer" onClick={handleDis}>
              ...View More
            </span>
          </p>
        </section>
      </div>
      <div
        className={` absolute  z-[100] overflow-hidden p-5 bg-gray-700 transition-all duration-[0.5s] ${
          Wordlength === "short" ? "top-[-100%]" : "top-0"
        } `}
      >
        <p className="All h-[200px] overflow-scroll text-[0.9rem]">
          <span className="text-blue-400">
            {animeData.synopsis
              ? animeData.synopsis.slice(0, 200)
              : "No Summary"}
          </span>
          <span>
            {animeData.synopsis ? animeData.synopsis.slice(200) : "No Summary"}
          </span>
        </p>
      </div>
    </main>
  );
};

export default AnimeInfo;
