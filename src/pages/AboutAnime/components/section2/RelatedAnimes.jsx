import React, { useState } from "react";
import { Link } from "react-router-dom";

const RelatedAnimes = ({ related }) => {
  return (
    <section className="">
      <main>
        <ul className="Allside flex overflow-x-scroll gap-5 h-[240px] mx-3 pb-2">
          {related.map((anime, index) => {
            return (
              <Link
                key={index}
                to={`/${anime.id}`}
                className="AnimeList w-[150px] flex-shrink-0 relative bottomShadow"
              >
                <img
                  src={anime.img}
                  alt={anime.name}
                  className="size-full rounded-md object-cover"
                />
                <div className=" absolute bottom-0 left-0 right-0 flex flex-col px-2 pt-2 font-semibold text-[0.8rem] z-[2] font-mono">
                  <p className="text-white bg-blue-400 w-fit px-2 rounded-md">
                    {anime.category}
                  </p>
                  <p>
                    {anime.name.length > 12
                      ? anime.name.slice(0, 12) + "..."
                      : anime.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </ul>
      </main>
    </section>
  );
};

export default RelatedAnimes;
