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

  useEffect(() => {
    if (Request.type === "My List") {
      const upDateMyList = setInterval(() => {
        setMyList(() => {
          const myListLocalValue =
            JSON.parse(localStorage.getItem("myList")) || [];
          return myListLocalValue;
        });
      }, 2000);
      return () => clearInterval(upDateMyList);
    }
  }, []);

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
    if (Request.type === "My List") {
      return setfetchCount((current) => {
        if (current >= 6) return current;
        return current + 1;
      });
    }
    try {
      const respons = await fetch(Request.url);
      const data = await respons.json();
      setAnimes(() => {
        return Array.from(data.results);
      });
      setfetchCount((current) => {
        if (current >= 6) return current;
        return current + 1;
      });
    } catch (error) {
      console.log(error);
      setfetchCount((current) => {
        if (current >= 6) return current;
        return current + 1;
      });
    }
  };

  useEffect(() => {
    if (fetchCount >= 6 && Request.type === "My List") {
      saveAnimeToList();
      if (!myList[0]) return;
      setAnimes(() => {
        return { type: "myList", data: myList };
      });
    }
    Fetching();
  }, [fetchCount, myList]);

  return <></>;
};

export default FetchAnime;
