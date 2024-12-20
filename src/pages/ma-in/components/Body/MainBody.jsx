import React, { useState } from "react";
import AnimeMain from "./AnimeMainList/AnimeMain";
import "./Body.css";
import { createContext } from "react";
import Upcoming from "./UpcomingAnime/Upcoming";
export const Requests = createContext(null);
const MainBody = () => {
  const Request = [
    {
      type: "Top Airing",
      typeUrl: "top-airing",
      url: "https://animerunway.vercel.app/anime/zoro/top-airing",
    },
    {
      type: "New Episode Releases",
      typeUrl: "recent-episodes",
      url: "https://animerunway.vercel.app/anime/zoro/recent-episodes",
    },
    {
      type: "Popular",
      typeUrl: "most-popular",
      url: "https://animerunway.vercel.app/anime/zoro/most-popular",
    },
    {
      type: "Latest Completed",
      typeUrl: "latest-completed",
      url: "https://animerunway.vercel.app/anime/zoro/latest-completed",
    },
    {
      type: "Movies",
      typeUrl: "movie",
      url: "https://animerunway.vercel.app/anime/zoro/movie",
    },
  ];

  return (
    <main className="mb-5">
      <section className="flex flex-col gap-5 ">
        {Request.map((data) => {
          return (
            <Requests.Provider key={data.type} value={{ data }}>
              <AnimeMain />
            </Requests.Provider>
          );
        })}
      </section>
      <section>
        <Upcoming />
      </section>
    </main>
  );
};

export default MainBody;
