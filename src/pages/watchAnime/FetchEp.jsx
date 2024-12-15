import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FetchEp = ({ setServers, setFetching, setChangingEP }) => {
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

  const fetchAnimeRealId = async () => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/${splitpath[0]}`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      FetchAnimeInfo(data.results[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchAnimeInfo = async (id) => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/info/${id}`;
    try {
      const respones = await fetch(url);
      const data = await respones.json();
      setServers((current) => {
        return { ...current, Totalep: data.episodes, animeName: data.title };
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
    fetchAnimeRealId();
  }, [path]);

  return <></>;
};

export default FetchEp;
