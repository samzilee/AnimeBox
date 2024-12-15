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
      <Link to={back} className="absolute top-0 z-10 mt-2 ml-1">
        <FiArrowLeft className="text-[1.7rem]" />
      </Link>
      <Link to="/" className="absolute top-0 right-0 z-10 ml-1">
        <img src={logo} alt="web Logo" className="w-[70px]" />
      </Link>
    </main>
  );
};

export default AnimeVideo;
