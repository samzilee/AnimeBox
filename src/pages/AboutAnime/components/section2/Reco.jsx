import React from "react";
const Reco = ({ characters }) => {
  if (!characters[0]) return;
  return (
    <div>
      <header className=" p-2 font-bold text-blue-400 text-[0.9rem] pl-5 ">
        <p>
          Characters <span>({characters.length})</span>
        </p>
      </header>
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
    </div>
  );
};

export default Reco;
