import React, { useEffect, useState } from "react";
import MainHeader from "./components/Header/MainHeader.jsx";
import MainBody from "./components/Body/MainBody.jsx";
import { useLocation } from "react-router-dom";

const Main = () => {
  const path = useLocation().pathname;
  localStorage.setItem("prevPath", path);
  if (!localStorage.getItem("myList")) {
    localStorage.setItem("myList", JSON.stringify([]));
  }

  return (
    <main className="All h-dvh overflow-y-scroll overflow-x-hidden">
      <MainHeader />
      <MainBody />
      <div className="text-center text-gray-500 font-bold text-[0.8rem] px-2">
        <p>
          Anime Box does not store any files on our server; we only link to the
          media which is hosted on 3rd party services.
        </p>
        <p>© Anime Box All rights reserved.</p>
      </div>
    </main>
  );
};

export default Main;
