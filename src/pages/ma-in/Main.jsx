import React from "react";
import MainHeader from "./components/Header/MainHeader.jsx";
import MainBody from "./components/Body/MainBody.jsx";
import { useLocation } from "react-router-dom";

const Main = () => {
  const path = useLocation().pathname;
  localStorage.setItem("prevPath", path);
  return (
    <main className="All h-dvh pb-5 overflow-y-scroll">
      <MainHeader />
      <MainBody />
    </main>
  );
};

export default Main;
