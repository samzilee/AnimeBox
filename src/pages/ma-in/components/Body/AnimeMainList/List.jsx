import React, { useContext } from "react";
import { Requests } from "../MainBody";
import { Link } from "react-router-dom";

const List = ({ Animes }) => {
  const Request = useContext(Requests).data;
  if (!Animes) return;

  return (
    <div className="flex flex-col gap-2 pt-2">
      <header className="flex justify-between px-5 items-center">
        <section className="font-bold text-[1.3rem]">{Request.type}</section>
        <section className="text-blue-300 font-bold text-[0.9rem]">
          <Link to={`see-all/${Request.typeUrl}`}>View all</Link>
        </section>
      </header>
      {Animes.type ? (
        <main className="Allside h-full overflow-x-scroll md:py-5 md:mx-5">
          <ul className="flex gap-5 px-5 h-[200px]   w-fit">
            {Animes.data.map((anime) => {
              return (
                <Link
                  key={anime.mal_id}
                  to={`/${anime.title.split("/").join(" ")}`}
                  className="AnimeList cursor-pointer min-w-[150px] max-w-[150px] h-[200px] rounded-lg relative "
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="size-full filter brightness-[0.9] rounded-lg object-cover"
                  />
                  {/*  <div className=" absolute top-0 left-0 right-0 flex justify-between px-2 pt-2 font-semibold text-[0.7rem]">
                  <p className="bg-white text-black px-2 rounded-md ">
                    {anime.nsfw ? "R" : "PG-13"}
                  </p>
                  <p className="bg-blue-400 px-2 rounded-md text-center">HD</p>
                </div> */}
                </Link>
              );
            })}
          </ul>
        </main>
      ) : (
        <main className="Allside h-full overflow-x-scroll md:py-5 md:mx-5">
          <ul className="flex gap-5 px-5 h-[200px] w-fit">
            {Animes.map((anime) => {
              return (
                <Link
                  key={anime.id}
                  to={`/${anime.id}`}
                  className="AnimeList cursor-pointer min-w-[150px] max-w-[150px] h-[200px] rounded-lg relative "
                >
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="size-full filter brightness-[0.9] rounded-lg object-cover"
                  />
                  <div className=" absolute top-0 left-0 right-0 flex justify-between px-2 pt-2 font-semibold text-[0.7rem]">
                    <p className="bg-white text-black px-2 rounded-md ">
                      {anime.nsfw ? "R" : "PG-13"}
                    </p>
                    <p className="bg-blue-400 px-2 rounded-md text-center">
                      HD
                    </p>
                  </div>
                </Link>
              );
            })}
          </ul>
        </main>
      )}
    </div>
  );
};

export default List;
