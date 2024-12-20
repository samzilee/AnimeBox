import React from "react";

import { TbFaceIdError } from "react-icons/tb";

const ErrorTrailer = () => {
  return (
    <div className="size-full bg-gray-900 flex flex-col justify-center items-center text-red-600">
      <TbFaceIdError className="size-[55px]" />
      <p>Trailer Not Available</p>
    </div>
  );
};

export default ErrorTrailer;
