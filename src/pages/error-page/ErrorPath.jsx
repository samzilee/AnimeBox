import React from "react";
import { Link } from "react-router-dom";

const ErrorPath = () => {
  setTimeout(() => {
    console.error("Error 404: Page Not Found");
  }, 1000);
  return (
    <main className="flex justify-center items-center p-6 h-dvh">
      <div className=" flex flex-col gap-2 justify-center items-center h-fit w-[300px] p-5 rounded-lg border-[2px] bg-white text-gray-400">
        <h1 className="font-bold text-red-500">Page Not Found</h1>
        <p>
          Looks like you’ve followed a broken link or entered a URL that doesn’t
          exist on this site.
        </p>
        <Link
          to="/"
          className="font-bold px-3 w-fit bg-green-500 text-white rounded-md"
        >
          Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPath;
