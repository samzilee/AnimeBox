import React from "react";
import ErrorTrailer from "./ErrorTrailer";
const Reco = ({ characters, trailer }) => {
  return (
    <section>
      <div className="h-[250px] md:w-[500px] px-4 mt-4">
        {!trailer.embed_url ? (
          <ErrorTrailer />
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={trailer.embed_url}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </div>
      <div>
        <header className=" p-2 font-bold text-blue-400 text-[0.9rem] pl-5 ">
          <p>
            Characters <span>({characters.length})</span>
          </p>
        </header>
        {!characters[0] ? (
          <p className="pl-5 font-bold">N/A</p>
        ) : (
          <ul className="Allside flex overflow-x-scroll gap-5 px-5  h-[230px]">
            {characters.map((character) => {
              return (
                <li
                  key={character.character.mal_id}
                  className="AnimeList w-[150px] flex-shrink-0 relative bottomShadow"
                >
                  <img
                    src={character.character.images.jpg.image_url}
                    alt={character.character.name}
                    className="size-full rounded-md"
                  />
                  <div className=" absolute bottom-0 left-0 right-0 flex flex-col px-2 pt-2 font-semibold text-[0.8rem] z-[2] font-mono">
                    <p className="text-blue-400">{character.role}</p>
                    <p>{character.character.name}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Reco;
