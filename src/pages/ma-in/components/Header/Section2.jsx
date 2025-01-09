import React, { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const Section2 = ({ NowShowing }) => {
  const [move, setMove] = useState(false);
  const [animeSaved, setAnimeSaved] = useState(false);

  const styleBtn = () => {
    const myList = JSON.parse(localStorage.getItem("myList2"));

    if (!myList || !NowShowing) return;
    const listCheck = myList.filter(
      (anime) => anime.anime_id === NowShowing.info.anime_id
    );
    if (listCheck[0]) return setAnimeSaved(true);
    return setAnimeSaved(false);
  };

  useEffect(() => {
    styleBtn();
  }, [NowShowing, animeSaved]);

  const saveAnime = () => {
    setAnimeSaved(true);
    //temporary saving anime for main bookmark
    localStorage.setItem(
      "temporarySavedAnime",
      JSON.stringify(NowShowing.info)
    );
    const myList = JSON.parse(localStorage.getItem("myList2"));
    const temporarySavedAnime = JSON.parse(
      localStorage.getItem("temporarySavedAnime")
    );

    localStorage.setItem(
      "myList2",
      JSON.stringify([temporarySavedAnime, ...myList])
    );
    localStorage.removeItem("temporarySavedAnime");
    styleBtn();
  };

  const removeAnime = () => {
    setAnimeSaved(false);
    const myList = JSON.parse(localStorage.getItem("myList2"));
    localStorage.removeItem("temporarySavedAnime");
    if (!myList) return;
    const newMylist = myList.filter(
      (anime) => anime.info.anime_id !== NowShowing.info.anime_id
    );
    localStorage.setItem("myList2", JSON.stringify(newMylist));
    styleBtn();
  };

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
        <header className="text-[1rem] font-bold mb-1">
          <p>{NowShowing.info.name}</p>
        </header>
        <ul className="text-[0.7rem] mb-1 flex font-semibold gap-1 text-gray-200">
          [
          {NowShowing.moreInfo.Genres.map((genre, index) => {
            return (
              <li key={index}>
                {genre}
                {NowShowing.moreInfo.Genres.length - 1 === index ? "" : ","}
              </li>
            );
          })}
          ]
        </ul>
        <div className="flex gap-3">
          <Link
            to={`/${NowShowing.info.id}`}
            className="flex items-center gap-1 px-3 py-[1px] rounded-xl bg-blue-400 font-bold"
          >
            <BsPlayCircleFill className="w-[0.9rem]" />
            <p className="text-[0.9rem]">Play</p>
          </Link>{" "}
          {animeSaved ? (
            <button
              id={NowShowing.info.anime_id}
              className="flex items-center gap-1 px-3 py-[1px]  border-[1.7px] border-blue-400 text-blue-400 rounded-xl font-bold"
              onClick={() => removeAnime()}
            >
              <IoMdCheckmark /> <p className="text-[0.9rem]">My List</p>
            </button>
          ) : (
            <button
              id={NowShowing.info.anime_id}
              className="flex items-center gap-1 px-3 py-[1px]  border-[1.7px] rounded-xl font-bold "
              onClick={() => saveAnime()}
            >
              <BiPlus /> <p className="text-[0.9rem]">My List</p>
            </button>
          )}
        </div>
      </main>
    </footer>
  );
};

export default Section2;
