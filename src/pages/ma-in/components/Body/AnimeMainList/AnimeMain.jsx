import React, { useEffect, useState } from "react";
import FetchAnime from "./FetchAnime";
import List from "./List";

const AnimeMain = () => {
  const [Animes, setAnimes] = useState(null);

  return (
    <div>
      <FetchAnime setAnimes={setAnimes} />
      <List Animes={Animes} />
    </div>
  );
};

export default AnimeMain;
