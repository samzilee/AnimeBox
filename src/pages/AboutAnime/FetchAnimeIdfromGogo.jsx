import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FetchAnimeIdfromGogo = ({
  animeData,
  setAnimeId,
  setAvailableEp,
  setFetching,
}) => {
  const path = useLocation().pathname;

  const fetchFromGogo = async () => {
    if (animeData === null) return;
    let jsf = null;
    if (animeData.title === "Naruto: Shippuuden") {
      jsf = "Naruto Shippuden";
    }

    let jsm = null;
    if (
      animeData.title ===
      "Tensei shitara Slime Datta Ken 3rd Season: Kanwa - Diablo Nikki"
    ) {
      jsm = animeData.title.split(":")[0];
    }

    const url = `https://animerunway.vercel.app/anime/gogoanime/${
      jsf || jsm || animeData.title || animeData.title_english
    }`;
    try {
      setFetching(true);
      const respons = await fetch(url);
      const data = await respons.json();
      fetchEplistFromGogo(data.results[0].id);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  const fetchEplistFromGogo = async (id) => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/info/${id}`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      setAnimeId(data.episodes[0].id);
      setAvailableEp(data.episodes);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    setAvailableEp([]);
    fetchFromGogo();
  }, [animeData, path]);

  return <div></div>;
};

export default FetchAnimeIdfromGogo;
