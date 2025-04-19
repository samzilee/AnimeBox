import React, { useState } from "react";
import AnimeMain from "./AnimeMainList/AnimeMain";
import "./Body.css";
import { createContext } from "react";
import Upcoming from "./UpcomingAnime/Upcoming";
export const Requests = createContext(null);
const MainBody = () => {
  const Request = [
    {
      type: "My List",
      typeUrl: "my-List",
      url: "My List",
    },
    {
      type: "Top Airing",
      typeUrl: "top-airing",
      url: "https://animerunway2-0.vercel.app/aniwatch/top-airing",
    },
    {
      type: "New Episode Releases",
      typeUrl: "recently-updated",
      url: "https://animerunway2-0.vercel.app/aniwatch/recently-updated",
    },
    {
      type: "Popular",
      typeUrl: "most-popular",
      url: "https://animerunway2-0.vercel.app/aniwatch/most-popular",
    },
    {
      type: "Latest Completed",
      typeUrl: "completed",
      url: "https://animerunway2-0.vercel.app/aniwatch/completed",
    },
    {
      type: "Movies",
      typeUrl: "movie",
      url: "https://animerunway2-0.vercel.app/aniwatch/movie",
    },
  ];

  return (
    <main className="mb-5 px-2">
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
