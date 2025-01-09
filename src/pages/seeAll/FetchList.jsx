import React, { useEffect } from "react";

const FetchList = ({
  type,
  setAnimeList,
  setError,
  page,
  setHasNextPage,
  setFetching,
}) => {
  const url = `https://animerunway2-0.vercel.app/aniwatch/${type}?page=`;

  const fetchAllList = async () => {
    setFetching(true);
    try {
      const respons = await fetch(url + page);
      let data = await respons.json();
      setHasNextPage(data.hasNextPage);
      setAnimeList(data.animes);
      setFetching(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (type === "my-List") {
      const myList = JSON.parse(localStorage.getItem("myList2"));
      setAnimeList(() => {
        if (!myList[0]) return ["N/V"];
        return myList;
      });
      return setFetching(false);
    }
    fetchAllList();
  }, [page]);

  return <></>;
};

export default FetchList;
