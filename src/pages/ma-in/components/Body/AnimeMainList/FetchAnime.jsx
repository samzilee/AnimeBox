import React, { useEffect, useContext, useState } from "react";
import { Requests } from "../MainBody";
const FetchAnime = ({ setAnimes }) => {
  const Request = useContext(Requests).data;
  const [fetchCount, setfetchCount] = useState(0);

  const temporarySavedAnime = JSON.parse(
    localStorage.getItem("temporarySavedAnime")
  );

  const [myList, setMyList] = useState(() => {
    const myListLocalValue = JSON.parse(localStorage.getItem("myList")) || [];
    return myListLocalValue;
  });

  const saveAnimeToList = () => {
    if (!temporarySavedAnime) return;
    localStorage.setItem(
      "myList",
      JSON.stringify([temporarySavedAnime, ...myList])
    );

    setMyList(() => {
      const myListLocalValue = JSON.parse(localStorage.getItem("myList")) || [];
      return myListLocalValue;
    });

    //removing the temporary Saved Anime
    localStorage.removeItem("temporarySavedAnime");
  };

  const Fetching = async () => {
    try {
      const respons = await fetch(Request.url);
      const data = await respons.json();
      setAnimes(() => {
        return Array.from(data.results);
      });
      setfetchCount((current) => {
        if (current >= 5) return current;
        return current + 1;
      });
    } catch (error) {
      console.log(error);
      setfetchCount((current) => {
        if (current >= 5) return current;
        return current + 1;
      });
    }
  };

  useEffect(() => {
    if (fetchCount >= 5) {
      saveAnimeToList();
      if (!myList[0]) return;
      setAnimes(() => {
        return { type: "myList", data: myList };
      });
    }
    Fetching();
  }, [myList, fetchCount]);
  return <></>;
};

export default FetchAnime;
