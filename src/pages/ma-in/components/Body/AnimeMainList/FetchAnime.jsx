import React, { useEffect, useContext } from "react";
import { Requests } from "../MainBody";
const FetchAnime = ({ setAnimes }) => {
  const Request = useContext(Requests).data;
  const Fetching = async () => {
    try {
      const respons = await fetch(Request.url);
      const data = await respons.json();
      setAnimes(() => {
        return Array.from(data.results);
      });
    } catch (err) {
      /* Fetching(); */
      console.log("Error");
    }
  };

  useEffect(() => {
    Fetching();
  }, []);
  return <div></div>;
};

export default FetchAnime;
