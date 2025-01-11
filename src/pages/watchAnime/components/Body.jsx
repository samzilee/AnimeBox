import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Body = ({
  watching,
  totalEp,
  servers,
  type,
  serverName,
  setType,
  setServerName,
}) => {
  const path = useLocation().pathname + useLocation().search;
  const epID = path.slice(10);

  const [search, setSearch] = useState("");
  const [episodes, setEpisodes] = useState([]);

  const [showSevers, setShowServers] = useState(false);

  useEffect(() => {
    if (!servers || !totalEp[0]) return;
    const epName = totalEp.filter(
      (ep) => ep.episodeNo === servers.episodeNo
    )[0];
    localStorage.setItem(
      "continueWatching2",
      JSON.stringify({
        episodeNo: servers.episodeNo,
        episodeId: servers.episodeId,
        episodeName: epName.name,
      })
    );
  }, [servers, totalEp]);

  useEffect(() => {
    if (!totalEp[0]) return;
    setEpisodes((current) => {
      if (!current) return totalEp;
      return totalEp.slice(parseInt(search) - 1);
    });
  }, [search, totalEp, path]);

  if (totalEp[0]) {
    episodes.map((ep) => {
      const epsBtn = document.getElementById(ep.episodeId);
      if (epsBtn) {
        epsBtn.style.backgroundColor = "";
      }
    });

    const epBtn = document.getElementById(epID);
    if (epBtn) {
      epBtn.style.backgroundColor = "rgb(96,165,250)";
    }
  }

  if (type && serverName) {
    const clickedBtn = document.getElementById(type + serverName);
    if (clickedBtn) {
      clickedBtn.style.backgroundColor = "rgb(96,165,250)";
      clickedBtn.style.color = "white";
    }
  }

  /*  useEffect(() => {
    if (!totalEp[0]) return;
    episodes.map((ep) => {
      const epsBtn = document.getElementById(ep.episodeId);
      if (!epsBtn) return;
      epsBtn.style.backgroundColor = "";
    });

    const epBtn = document.getElementById(epID);
    if (!epBtn) return;
    epBtn.style.backgroundColor = "rgb(96,165,250)";
  }, [totalEp, episodes,]); */

  /* useEffect(() => {
    const clickedBtn = document.getElementById(type + serverName);
    if (clickedBtn) {
      clickedBtn.style.backgroundColor = "rgb(96,165,250)";
      clickedBtn.style.color = "white";
    }
  }, [servers, type, serverName]); */

  const changeServer = (type, serverName) => {
    //sub
    servers.sub.map((server) => {
      const btn = document.getElementById("sub" + server.serverName);
      if (!btn) return;
      btn.style.backgroundColor = "transparent";
      btn.style.color = "rgb(96,165,250)";
    });
    //dub
    servers.dub.map((server) => {
      const btn = document.getElementById("dub" + server.serverName);
      if (!btn) return;
      btn.style.backgroundColor = "transparent";
      btn.style.color = "rgb(96,165,250)";
    });

    const clickedBtn = document.getElementById(type + serverName);
    clickedBtn.style.backgroundColor = "rgb(96,165,250)";
    clickedBtn.style.color = "white";

    setType(type);
    setServerName(serverName);
  };

  if (!totalEp[0] || !servers || !watching) return;
  if (!watching.aboutAnime) return;

  return (
    <main className="h-[500px] md:w-[50%]">
      <header className="text-center py-2 bg-gray-900 bg-opacity-[0.5] font-mono relative">
        <p className="text-[0.9rem]">
          You are watching{" "}
          <span className="text-blue-400">
            Episode {watching.aboutAnime.episodeNo}
          </span>
        </p>
        <p className="font-bold text-[0.8rem] text-gray-500">
          {" "}
          {watching.aboutAnime.name}
        </p>
        <p className=" absolute top-[5px] right-[10px] text-gray-600 border-[1px] border-gray-600 px-2 rounded-full ">
          {watching.type.slice(0, 1).toUpperCase() + watching.type.slice(1, 3)}
        </p>
      </header>
      <div className="pt-5">
        <section className="px-4  flex flex-col">
          <button
            className={`border mb-5 px-3 py-[1.3px] rounded-lg transition-all duration-[0.5s]  ${
              showSevers
                ? "border-blue-400 border-[1.5px] text-white bg-blue-400"
                : "text-blue-400 bg-transparent border-blue-400 border-[1.5px]"
            }`}
            onClick={() => {
              setShowServers((current) => {
                if (current) return false;
                return true;
              });
            }}
          >
            Servers
          </button>
          <div
            className={`p-2 flex flex-wrap gap-3 transition-all duration-[0.5s] bg-gray-900 bg-opacity-[0.5] rounded-md  ${
              showSevers
                ? "h-[100%]"
                : "translate-x-[100%] overflow-hidden opacity-0 h-0"
            }`}
          >
            <div className="flex gap-2 h-fit ">
              <label className="font-mono">Sub:</label>
              <ul className="flex flex-wrap gap-2">
                {!servers.sub[0] ? (
                  <div className=" flex items-center">
                    <FiAlertCircle className="text-red-400" />
                  </div>
                ) : (
                  servers.sub.map((server, index) => {
                    return (
                      <button
                        key={index}
                        id={"sub" + server.serverName}
                        className="px-2 border-blue-400 border-[1.5px] rounded-full text-blue-400 transition-all duration-[0.3s]"
                        onClick={() => changeServer("sub", server.serverName)}
                      >
                        {server.serverName}
                      </button>
                    );
                  })
                )}
              </ul>
            </div>

            <div className="flex gap-2 h-fit">
              <label className="font-mono">Dub:</label>
              <ul className="flex flex-wrap gap-2">
                {!servers.dub[0] ? (
                  <div className=" flex items-center">
                    <FiAlertCircle className="text-red-400" />
                  </div>
                ) : (
                  servers.dub.map((server, index) => {
                    return (
                      <button
                        key={index}
                        id={"dub" + server.serverName}
                        className="px-2 border-blue-400 border-[1.5px] rounded-full text-blue-400 transition-all duration-[0.3s]"
                        onClick={() => changeServer("dub", server.serverName)}
                      >
                        {server.serverName}
                      </button>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </section>
        <section className="flex items-center p-2">
          <div className="All flex flex-col gap-3 h-[340px] p-5 bg-gray-900 bg-opacity-[0.5] rounded-md w-full">
            <header className="w-full flex justify-between h-fit flex-shrink gap-3 items-center">
              <label className="text-gray-400 font-mono text-nowrap text-[15px]">
                Total Episodes: <span>{totalEp.length}</span>
              </label>

              <div className="flex items-center gap-2 px-2 py-1  bg-gray-900 rounded-md h-fit">
                <FaSearch className="text-[1.2rem]" />
                <input
                  type="number"
                  placeholder="Search Ep"
                  className="w-full bg-transparent outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </header>

            <ul className="All epList flex flex-wrap gap-2 overflow-auto h-fit max-h-full  w-fit ">
              {episodes.map((ep, index) => {
                return (
                  <Link key={index} to={`/watching/${ep.episodeId}`}>
                    <button
                      id={ep.episodeId}
                      className={`w-16 h-9 flex justify-center items-center  bg-opacity-[0.3] rounded-md text-gray-300 font-semibold text-[0.9rem] ${
                        ep.filler ? "text-blue-300 bg-blue-400" : "bg-gray-500"
                      }`}
                    >
                      {ep.episodeNo}
                    </button>
                  </Link>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Body;
