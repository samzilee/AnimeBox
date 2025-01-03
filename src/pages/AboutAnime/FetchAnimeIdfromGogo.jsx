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

    const url = `https://animerunway.vercel.app/anime/gogoanime/${
      jsf || animeData.title || animeData.title_english
    }`;
    try {
      setFetching(true);
      const respons = await fetch(url);
      const data = await respons.json();

      let newData = null;
      newData = data.results.filter(
        (anime) =>
          anime.releaseDate == animeData.year || anime.title === animeData.title
      );

      if (newData.length < 1) {
        newData = data.results;
      }

      fetchEplistFromGogo(newData[0].id);
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
      setAnimeId(data.episodes.filter((ep) => ep.number === 1)[0].id);
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
