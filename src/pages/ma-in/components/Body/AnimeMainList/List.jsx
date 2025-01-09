import React, { useContext } from "react";
import { Requests } from "../MainBody";
import { Link } from "react-router-dom";

const List = ({ Animes }) => {
  const Request = useContext(Requests).data;
  if (!Animes[0]) return;

  return (
    <div className="flex flex-col gap-2 pt-2">
      <header className="flex justify-between px-5 items-center">
        <section className="font-bold text-[1.3rem]">{Request.type}</section>
        <section className="text-blue-300 font-bold text-[0.9rem] z-[2]">
          <Link to={`see-all/${Request.typeUrl}`}>View all</Link>
        </section>
      </header>
      <main className="Allside h-full overflow-x-scroll md:py-5 md:mx-5">
        <ul className="flex gap-5 px-5 h-[200px] w-fit ">
          {Animes.map((anime, index) => {
            return (
              <Link
                key={index}
                to={`/${anime.id || anime.backUpId}`}
                className="AnimeList cursor-pointer min-w-[150px] max-w-[150px] h-[200px] rounded-lg relative border"
              >
                <img
                  src={anime.img}
                  alt={anime.name}
                  className="size-full filter brightness-[0.9] rounded-lg object-cover"
                />
                <div className=" absolute top-0 left-0 right-0 flex justify-between px-2 pt-2 font-semibold text-[0.7rem]">
                  {anime.rated || anime.rating === "R" ? (
                    <p className="bg-red-400 text-white px-2 rounded-md ">
                      18+
                    </p>
                  ) : (
                    <p className="bg-white text-black px-2 rounded-md ">
                      PG-13
                    </p>
                  )}
                  <p className="bg-blue-400 px-2 rounded-md text-center">HD</p>
                </div>
              </Link>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default List;
