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
    if (type === "my-List") {
      const myList = JSON.parse(localStorage.getItem("myList"));
      return setAnimeList(() => {
        if (!myList[0]) return ["N/V"];
        return myList;
      });
    }
    fetchAllList();
  }, [page]);

  return <></>;
};

export default FetchList;
