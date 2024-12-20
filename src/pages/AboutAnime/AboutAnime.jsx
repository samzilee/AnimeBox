import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FetchAbout from "./FetchAbout";
import "./about.css";
import Loader from "../../Loader";
import Image from "./components/section1/Image";
import AnimeInfo from "./components/section1/AnimeInfo";
import Raco from "./components/section2/Reco";

import Error from "../../Error";
import FetchAnimeIdfromGogo from "./FetchAnimeIdfromGogo";
import EpList from "./components/section2/EpList";
const AboutAnime = () => {
  const animeName = useLocation();
  const [animeData, setAnimeData] = useState(null);
  const [error, setError] = useState(false);
  const [animeId, setAnimeId] = useState("");
  const [availableEp, setAvailableEp] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [characters, setCharacters] = useState([]);

  if (error) return <Error />;
  return (
    <main className="All h-dvh pb-5 overflow-y-scroll " id="mainAbout">
      <FetchAbout
        animeName={animeName.pathname}
        setAnimeData={setAnimeData}
        setError={setError}
        setCharacters={setCharacters}
      />
      <FetchAnimeIdfromGogo
        animeData={animeData}
        setAnimeId={setAnimeId}
        setAvailableEp={setAvailableEp}
        setFetching={setFetching}
      />

      {animeData !== null && !fetching ? (
        <>
          <Image animeData={animeData} />
          <AnimeInfo
            animeData={animeData}
            animeId={animeId}
            availableEp={availableEp}
          />
          <EpList
            animeData={animeData}
            animeId={animeId}
            availableEp={availableEp}
          />
          <Raco characters={characters} trailer={animeData.trailer} />
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default AboutAnime;
