import React, { useEffect, useState } from "react";
import FetchEp from "./FetchEp";
import AnimeVideo from "./components/AnimeVideo";
import Body from "./components/Body";
import Error from "../../Error";
import { useLocation } from "react-router-dom";

const WatchAnime = () => {
  const [totalEp, setTotalEp] = useState([]);
  const [servers, setServers] = useState(null);
  const [watching, setWatching] = useState(null);
  const [selection, setSelection] = useState(null);

  const [type, setType] = useState("sub");
  const [serverName, setServerName] = useState("vidsrc");

  const [fetching, setFetching] = useState(true);
  const [changingEp, setChangingEP] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!servers) return;
    if (type === "sub") {
      const serverNameFilter = servers.sub.filter(
        (server) => server.serverName === serverName
      );
      if (!servers.sub[0]) return setType("dub");
      return setSelection(() => {
        return {
          type: "sub",
          serverName: serverNameFilter[0] || servers.sub[0],
          episodeId: servers.episodeId,
        };
      });
    } else if (type === "dub") {
      const serverNameFilter = servers.dub.filter(
        (server) => server.serverName === serverName
      );

      if (!servers.dub[0]) return setType("sub");
      return setSelection(() => {
        return {
          type: "dub",
          serverName: serverNameFilter[0] || servers.dub[0],
          episodeId: servers.episodeId,
        };
      });
    }
  }, [serverName, type, servers]);

  useEffect(() => {
    if (!totalEp || !servers) return;
    setWatching((current) => {
      const list = totalEp.filter((ep) => ep.episodeNo === servers.episodeNo);
      return {
        ...current,
        aboutAnime: list[0],
        type: type,
      };
    });
  }, [totalEp, servers, serverName, type]);

  return (
    <main>
      <FetchEp
        setServers={setServers}
        setWatching={setWatching}
        setFetching={setFetching}
        setChangingEP={setChangingEP}
        setError={setError}
        setTotalEp={setTotalEp}
        selection={selection}
      />
      {error && !fetching ? (
        <Error />
      ) : (
        <div className="md:flex">
          <AnimeVideo
            watching={watching}
            changingEp={changingEp}
            fetching={fetching}
          />
          <Body
            selection={selection}
            watching={watching}
            totalEp={totalEp}
            servers={servers}
            setType={setType}
            setServerName={setServerName}
          />
        </div>
      )}
    </main>
  );
};

export default WatchAnime;
