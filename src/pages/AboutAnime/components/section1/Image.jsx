import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const Image = ({ animeData }) => {
  const prevPath = localStorage.getItem("prevPath");

  return (
    <div className="topShadow">
      <div className="h-[300px] relative">
        <img
          src={animeData.images.jpg.large_image_url}
          alt={animeData.title}
          className="size-full object-cover"
        />
        <Link to={prevPath} className=" absolute top-0 w-fit p-2 z-10 ">
          <FiArrowLeft className="text-[1.7rem]" />
        </Link>
      </div>
      <p
        className={`absolute top-[7px] w-fit p-2 z-10 right-0 font-semibold text-[0.7rem] ${
          animeData.status === "Finished Airing"
            ? "bg-green-400"
            : "bg-blue-400"
        }  bg-opacity-[0.6] rounded-l-md`}
      >
        Status: <span>{animeData.status || "N/A"}</span>
      </p>
    </div>
  );
};

export default Image;
