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
        <Link to={prevPath} className=" absolute top-0 w-full p-2 z-10">
          <FiArrowLeft className="text-[1.7rem]" />
        </Link>
      </div>
    </div>
  );
};

export default Image;
