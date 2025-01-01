import React from "react";
import { Link } from "react-router-dom";

const MapUpcoming = ({ upcomingAnime }) => {
  if (!upcomingAnime[0]) return;
  return (
    <main className="flex flex-col mt-5 gap-1">
      <header className=" text-[1.5rem] font-bold font-mono text-blue-400 py-2 px-5 md:px-5 sticky top-0  z-50 bg-gray-800 ">
        <p className="">Upcoming Anime</p>
        <hr className="upcomingUnderLine border-0 rounded h-1 w-full" />
      </header>

      <ul className="flex justify-center flex-wrap gap-5 px-2 py-5">
        {upcomingAnime.map((anime, index) => {
          return (
            <Link
              to={`/${anime.title}`}
              key={index}
              className="AnimeList w-[45%] md:w-[170px]  h-[240px] rounded-lg relative overflow-hidden  "
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="size-full object-cover rounded-lg"
              />
              <p className="absolute bottom-0 left-0 right-0 text-[0.7rem] bg-gray-700 bg-opacity-[0.5] px-1">
                {anime.title_english || anime.title}
              </p>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default MapUpcoming;
