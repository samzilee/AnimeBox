import React, { useState } from "react";
import MainHeader from "./components/Header/MainHeader.jsx";
import MainBody from "./components/Body/MainBody.jsx";
import { useLocation } from "react-router-dom";

const Main = () => {
  const path = useLocation().pathname;
  localStorage.setItem("prevPath", path);

  return (
    <main className="All h-dvh overflow-y-scroll overflow-x-hidden">
      <MainHeader />
      <MainBody />
      <footer className="footer">
        <p>
          Created by <span className="highlight">Samzi</span>
        </p>
        <p>
          WhatsApp: <span>+234 09071003477</span>
        </p>
      </footer>
    </main>
  );
};

export default Main;
