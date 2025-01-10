import React from "react";
import ErrorTrailer from "./ErrorTrailer";

const YouTube = ({ trailer }) => {
  return (
    <div className="h-[250px] md:w-[500px] px-4 mt-4  flex-shrink-0 ">
      {!trailer.embed_url ? (
        <ErrorTrailer />
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={trailer.embed_url}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
};

export default YouTube;
