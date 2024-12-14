import React from "react";
import logo from "../../../Assets/large.png";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";

const AnimeVideo = ({ watching, changingEp }) => {
  if (!watching) return;

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
      <Link to="/" className=" absolute top-0 w-20  cursor-pointer">
        <img src={logo} alt="web-logo" className="size-full" />
      </Link>
    </main>
  );
};

export default AnimeVideo;
