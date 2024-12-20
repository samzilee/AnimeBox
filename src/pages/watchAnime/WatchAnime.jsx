import React, { useEffect, useState } from "react";
import FetchEp from "./FetchEp";
import AnimeVideo from "./components/AnimeVideo";
import Body from "./components/Body";
import Error from "../../Error";

const WatchAnime = () => {
  const [servers, setServers] = useState(null);
  const [watching, setWatching] = useState(null);
  const [serverName, setServerName] = useState("Gogo server");
  const [type, setType] = useState("sub");
  const [showServer, setShowServer] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [changingEp, setChangingEP] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!servers) return;
    if (type === "sub") {
      if (!servers.sub) return;
      setWatching(() => {
        const serverFilter = servers.sub.filter(
          (server) => server.name === serverName
        );
        if (serverFilter.length === 0)
          return {
            server: [servers.sub[0]],
            type: "sub",
          };
        return {
          server: servers.sub.filter((server) => server.name === serverName),
          type: "sub",
        };
      });
    } else if (type === "dub") {
      if (!servers.dub) return;
      setWatching(() => {
        const serverFilter = servers.sub.filter(
          (server) => server.name === serverName
        );
        if (serverFilter.length === 0)
          return {
            server: [servers.dub[0]],
            type: "sub",
          };
        return {
          server: servers.dub.filter((server) => server.name === serverName),
          type: "dub",
        };
      });
    }
  }, [servers, type, serverName]);

  return (
    <main className="All h-dvh overflow-y-scroll overflow-x-hidden">
      <FetchEp
        setServers={setServers}
        setFetching={setFetching}
        setChangingEP={setChangingEP}
        setError={setError}
      />
      {error && !fetching ? (
        <Error />
      ) : (
        <div className="md:flex ">
          <AnimeVideo
            watching={watching}
            changingEp={changingEp}
            fetching={fetching}
          />
          <Body
            servers={servers}
            watching={watching}
            setServerName={setServerName}
            setType={setType}
            showServer={showServer}
            setShowServer={setShowServer}
          />
        </div>
      )}
    </main>
  );
};

export default WatchAnime;
