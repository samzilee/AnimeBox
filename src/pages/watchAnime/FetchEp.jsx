import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FetchEp = ({ setServers, setFetching, setChangingEP, setError }) => {
  const path = useLocation().pathname;
  const slicePath = path.slice(10);
  const splitpath = slicePath.split("-episode-");
  localStorage.setItem("continueWatching", path);

  const FetchEPSub = async () => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/servers/${splitpath[0]}-episode-${splitpath[1]}`;
    try {
      setChangingEP(true);
      const respons = await fetch(url);
      const data = await respons.json();
      setServers((current) => {
        setChangingEP(false);
        return { ...current, sub: data };
      });
    } catch (error) {
      console.log(error);
      setFetching(false);
      setChangingEP(false);
    }
  };

  const FetchEPDub = async () => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/servers/${splitpath[0]}-dub-episode-${splitpath[1]}`;
    try {
      setChangingEP(true);
      const respons = await fetch(url);
      const data = await respons.json();
      setServers((current) => {
        setChangingEP(false);
        return { ...current, dub: data };
      });
    } catch (error) {
      console.log(error);
      setChangingEP(false);
    }
  };

  const fetchFromJikan = async () => {
    const animeName = localStorage.getItem("AnimeNameForWatch");
    if (!animeName) return;
    const url = `https://api.jikan.moe/v4/anime?q=${animeName}`;
    try {
      const respones = await fetch(url);
      const data = await respones.json();

      if (animeName === "Ranma ½") {
        return fetchAnimeRealId(
          data.data.filter((anime) => anime.year === 2024)[0]
        );
      }

      await fetchAnimeRealId(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnimeRealId = async (dataFromJikan) => {
    let jsf = null;
    if (dataFromJikan.title === "Naruto: Shippuuden") {
      jsf = "Naruto Shippuden";
    }

    let jsm = null;
    if (
      dataFromJikan.title ===
      "Tensei shitara Slime Datta Ken 3rd Season: Kanwa - Diablo Nikki"
    ) {
      jsm = dataFromJikan.title.split(":")[0];
    }

    const url = `https://animerunway.vercel.app/anime/gogoanime/${
      jsf || jsm || dataFromJikan.title || dataFromJikan.title_english
    }`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      await FetchAnimeInfo(
        data.results[0].id,
        dataFromJikan.title_english || dataFromJikan.title
      );
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const FetchAnimeInfo = async (id, title) => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/info/${id}`;
    try {
      const respones = await fetch(url);
      const data = await respones.json();
      setServers((current) => {
        return { ...current, Totalep: data.episodes, animeName: title };
      });
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching((current) => {
      if (current === false) return false;
      return true;
    });
    FetchEPSub();
    FetchEPDub();
    fetchFromJikan();
  }, [path]);

  return <></>;
};

export default FetchEp;
