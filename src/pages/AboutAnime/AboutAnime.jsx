import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FetchAbout from "./FetchAbout";
import "./about.css";
import Loader from "../../Loader";
import Image from "./components/section1/Image";
import AnimeInfo from "./components/section1/AnimeInfo";
import CharacterList from "./components/section2/CharacterList";

import Error from "../../Error";
import FetchEpisodes from "./FetchEpisodes";
import EpList from "./components/section2/EpList";
import RelatedAnimes from "./components/section2/RelatedAnimes";
import YouTube from "./components/section2/YouTube";

//About-main-page
const AboutAnime = () => {
  const [mainAnimeData, setMainAnimeData] = useState(null);
  const [animeData, setAnimeData] = useState(null);

  const [error, setError] = useState(false);
  const [animeId, setAnimeId] = useState("");
  const [availableEp, setAvailableEp] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [characters, setCharacters] = useState([]);

  const [showingList, setShowingList] = useState("related");

  if (error) return <Error />;
  return (
    <main id="mainAbout">
      <FetchAbout
        setMainAnimeData={setMainAnimeData}
        setAnimeData={setAnimeData}
        setError={setError}
        setCharacters={setCharacters}
        setFetching={setFetching}
      />
      <FetchEpisodes
        setAnimeId={setAnimeId}
        setAvailableEp={setAvailableEp}
        setFetching={setFetching}
      />

      {animeData && characters[0] && !fetching ? (
        <div>
          <Image animeData={animeData} />
          <AnimeInfo
            mainAnimeData={mainAnimeData}
            animeData={animeData}
            animeId={animeId}
            availableEp={availableEp}
          />
          <EpList animeData={animeData} availableEp={availableEp} />
          <div className="md:flex items-center">
            <YouTube trailer={animeData.trailer} />

            <div className="md:w-[50%]">
              <header className="px-[10%] py-5 w-full md:py-0 md:pb-5 ">
                <div className="flex justify-between items-center  relative font-bold text-nowrap ">
                  <button
                    className={`${
                      showingList === "related" ? "text-blue-400" : "text-white"
                    }`}
                    onClick={() => {
                      setShowingList("related");
                    }}
                  >
                    Related Animes
                  </button>
                  <button
                    className={`${
                      showingList !== "related" ? "text-blue-400" : "text-white"
                    }`}
                    onClick={() => {
                      setShowingList("characters");
                    }}
                  >
                    Characters <span>({characters.length})</span>{" "}
                  </button>

                  <hr
                    className={`rounded h-1 w-[150px] bg-blue-400 border-0 absolute bottom-[-5px]   ${
                      showingList === "related"
                        ? "left-[-10px]"
                        : "right-[-10px]"
                    }`}
                  />
                </div>
              </header>
              {showingList === "related" ? (
                <RelatedAnimes
                  related={mainAnimeData.relatedAnimes.slice(0, 15)}
                />
              ) : (
                <CharacterList characters={characters} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default AboutAnime;
