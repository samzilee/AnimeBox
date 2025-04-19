import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FetchEp = ({
  setServers,
  setWatching,
  setFetching,
  setChangingEP,
  setError,
  setTotalEp,
  selection,
}) => {
  const path = useLocation().pathname + useLocation().search;

  const epId = path.slice(10);

  const fetchTotalEpisodes = async () => {
    setFetching(true);
    try {
      const respons = await fetch(
        `https://animerunway2-0.vercel.app/aniwatch/episodes/${epId}`
      );
      const data = await respons.json();
      setTotalEp(data.episodes);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const fetchServers = async () => {
    setChangingEP(true);
    try {
      const respons = await fetch(
        `https://animerunway2-0.vercel.app/aniwatch/servers?id=${epId}`
      );
      const data = await respons.json();
      setServers(data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const fetchEpSrc = async () => {
    setChangingEP(true);
    try {
      const respons = await fetch(
        `https://animerunway2-0.vercel.app/aniwatch/episode-srcs?id=${
          selection.episodeId
        }&server=${
          selection.serverName.serverName === "vidsrc"
            ? "vidstreaming"
            : selection.serverName.serverName
        }&category=${selection.type}`
      );

      const data = await respons.json();
      setWatching((current) => {
        return { ...current, ...data };
      });

      setChangingEP(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setChangingEP(false);
    }
  };

  useEffect(() => {
    setTotalEp([]);
    fetchTotalEpisodes();
  }, []);

  useEffect(() => {
    fetchServers();
  }, [path]);

  useEffect(() => {
    if (!selection) return;
    fetchEpSrc();
  }, [selection]);

  return <></>;
};

export default FetchEp;
