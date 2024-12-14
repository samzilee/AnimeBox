import React from "react";
import logo from "../../../Assets/large.png";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";
import { FiArrowLeft } from "react-icons/fi";

const AnimeVideo = ({ watching, changingEp }) => {
  if (!watching) return;

  const back = localStorage.getItem("AboutPath");

  return (
    <main className="relative flex-1">
      <div className="w-full h-[290px] md:h-screen bg-gray-900">
        {changingEp ? (
          <Loader />
        ) : (
          <iframe
            src={watching.server[0].url}
            allowFullScreen={true}
            className="size-full"
          ></iframe>
        )}
      </div>
      <Link to={back} className=" absolute top-0 w-full p-2 z-10">
        <FiArrowLeft className="text-[1.7rem]" />
      </Link>
    </main>
  );
};

export default AnimeVideo;
