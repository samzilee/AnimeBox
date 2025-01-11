import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FetchAbout = ({
  setMainAnimeData,
  setAnimeData,
  setError,
  setCharacters,
  setFetching,
}) => {
  const path = useLocation().pathname;
  localStorage.setItem("AboutPath", path);

  const FetchInfoForJikan = async () => {
    setFetching(true);
    try {
      const respons = await fetch(
        `https://animerunway2-0.vercel.app/aniwatch/anime${path}`
      );
      const data = await respons.json();
      setMainAnimeData(data);

      FetchAbout(
        data.moreInfo["Japanese:"] || data.info.name,
        data.info.mal_id
      );
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const FetchAbout = async (animename, id) => {
    const url = `https://api.jikan.moe/v4/anime?q=${animename}`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();

      let newData = await data.data.filter((anime) => anime.mal_id === id);

      if (!newData[0]) {
        newData = [data.data[0]];
      }

      const t = setAnimeData(newData[0]);

      setTimeout(() => {
        FetchCharacter(newData[0].mal_id);
      }, 3000);

      return () => clearTimeout(t);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const FetchCharacter = async (id) => {
    const url = `https://api.jikan.moe/v4/anime/${id}/characters`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      setCharacters(data.data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    setAnimeData(null);
    setMainAnimeData(null);
    setCharacters([]);

    FetchInfoForJikan();
  }, [path]);

  return <div></div>;
};

export default FetchAbout;
