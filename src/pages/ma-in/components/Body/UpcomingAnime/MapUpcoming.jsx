import React from "react";
import { Link } from "react-router-dom";

const MapUpcoming = ({ upcomingAnime }) => {
  if (!upcomingAnime.animes) return;
  return (
    <main className="flex flex-col mt-5 gap-1">
      <header className="text-[1.5rem] font-bold font-mono text-blue-400 p-3 md:px-5 sticky top-0 bg-gray-800 z-[10]  ">
        <p className="">Upcoming Anime</p>
        <hr className="upcomingUnderLine border-0 rounded h-1 w-full" />
      </header>

      <ul className="flex justify-center flex-wrap gap-5 px-2 py-5">
        {upcomingAnime.animes.map((anime, index) => {
          return (
            <Link
              to={`/${anime.id}`}
              key={index}
              className="AnimeList w-[45%] md:w-[170px]  h-[240px] rounded-lg relative overflow-hidden hover:scale-[1.08] transition-all duration-[0.5s] "
            >
              <img
                src={anime.img}
                alt={anime.name}
                className="size-full object-cover rounded-lg"
              />
              <p className="absolute bottom-0 left-0 right-0 text-[0.7rem] bg-gray-700 bg-opacity-[0.5] px-1">
                {anime.name}
              </p>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default MapUpcoming;
