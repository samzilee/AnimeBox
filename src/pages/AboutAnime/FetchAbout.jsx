import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FetchAbout = ({ animeName, setAnimeData, setError, setCharacters }) => {
  const path = useLocation().pathname;
  localStorage.setItem("AboutPath", path);

  const FetchEnglishNameFromZoro = async () => {
    const url = `https://animerunway.vercel.app/anime/zoro/info?id=${animeName.slice(
      1
    )}`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      FetchAbout(data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const FetchAbout = async (ForJikan) => {
    const url = `https://api.jikan.moe/v4/anime?q=${
      ForJikan.message ? animeName.slice(1) : ForJikan.title
    }`;

    try {
      const respons = await fetch(url);
      const data = await respons.json();

      let newShit = await data.data.filter(
        (anime) =>
          anime.title_english === ForJikan.title ||
          anime.title === ForJikan.title ||
          anime.title_english === animeName.slice(1).split("%20").join(" ") ||
          anime.title === animeName.slice(1).split("%20").join(" ")
      );

      if (newShit.length >= 2) {
        newShit = await newShit.filter(
          (anime) => ForJikan.totalEpisodes == anime.episodes
        );
      }

      if (!newShit[0]) {
        newShit = await data.data.filter(
          (anime) => ForJikan.totalEpisodes == anime.episodes
        );
      }

      if (!newShit[0]) {
        newShit = await data.data;
      }

      await setAnimeData(newShit[0]);
      await FetchCharacter(newShit[0].mal_id);
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
    }
  };

  useEffect(() => {
    FetchEnglishNameFromZoro();
  }, [path]);

  return <div></div>;
};

export default FetchAbout;
