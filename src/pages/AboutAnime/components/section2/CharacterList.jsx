import React from "react";

const CharacterList = ({ characters }) => {
  return (
    <section>
      <div className="w-full overflow-hidden  border-gray-600 ">
        {!characters[0] ? (
          <p className="pl-5 font-bold">N/A</p>
        ) : (
          <ul className="Allside flex overflow-x-scroll gap-5 h-[240px] mx-3 pb-2">
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

export default CharacterList;
