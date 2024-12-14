import React, { useEffect } from "react";

const FetchList = ({ type, setAnimeList, setError, page, setHasNextPage }) => {
  const url = `https://animerunway.vercel.app/anime/zoro/${type}?page=`;

  const fetchAllList = async () => {
    try {
      const respons = await fetch(url + page);
      let data = await respons.json();
      setHasNextPage(data.hasNextPage);
      data = await data.results;
      setAnimeList(data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllList();
  }, [page]);

  return <></>;
};

export default FetchList;
