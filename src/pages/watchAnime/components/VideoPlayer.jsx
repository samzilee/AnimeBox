import React, { useEffect, useRef, useState } from "react";
import { HMSHLSPlayer, HMSHLSPlayerEvents } from "@100mslive/hls-player";

const VideoPlayer = ({ src, captions, poster }) => {
  const videoRef = useRef(null);
  const [statePlayer, setStatePlayer] = useState(null);
  const [errorPLayingVideo, setErrorPlayingVideo] = useState(false);
  const [playerCheck, setPlayerCheck] = useState(false);
  const [videoQualitys, setVideoQualitys] = useState([]);
  const [selectedQualitys, setSelectedQuality] = useState("Auto");

  useEffect(() => {
    if (videoRef.current && !playerCheck) {
      setPlayerCheck(true);
      setErrorPlayingVideo(false);
      const player = new HMSHLSPlayer(src, videoRef.current);

      setStatePlayer(player);

      player.hasCaptions(true);

      const existingTracks = videoRef.current.querySelectorAll("track");
      existingTracks.forEach((track) => track.remove());

      captions.map((track) => {
        const trackElement = document.createElement("track");
        trackElement.src =
          "/.netlify/functions/proxy-caption" + track.file.split("store")[1];
        trackElement.kind = track.kind || "subtitles";
        trackElement.label = track.label;
        trackElement.default = track.default || false;

        videoRef.current.appendChild(trackElement);
      });

      player.on(HMSHLSPlayerEvents.ERROR, (data) => {
        if (data.name === "manifest-load-error") {
          setErrorPlayingVideo(true);
          console.error("[HLSView] error in hls", data);
        }
      });

      player.on(HMSHLSPlayerEvents.MANIFEST_LOADED, (event, data) => {
        setVideoQualitys(event.layers);
      });

      const timeout = setTimeout(() => {
        setPlayerCheck(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [src, captions]);

  useEffect(() => {
    if (statePlayer && videoQualitys[0]) {
      const quality = videoQualitys.filter(
        (quality) => quality.height == selectedQualitys
      )[0];

      /*  statePlayer.on(HMSHLSPlayerEvents.LAYER_UPDATED, (event, data) => {
        console.log(event.layer);
        console.log(statePlayer.getVideoElement());
      }); */
      if (quality) {
        statePlayer.setLayer(quality);
      } else {
        statePlayer.setLayer({ height: "auto" });
      }
    }
  }, [selectedQualitys]);

  return (
    <>
      <video
        ref={videoRef}
        controls
        preload="auto"
        autoPlay={true}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
        }}
      ></video>

      <select
        className=" absolute z-50 top-[10px] right-[10px] bg-black p-1 border-[1.4px] rounded-md cursor-pointer border-gray-300 border-opacity-[0.5]"
        onChange={(e) => {
          setSelectedQuality(e.target.value);
        }}
      >
        <option key={0} value="Auto" defaultValue>
          Auto
        </option>
        {videoQualitys.map((quality, index) => {
          return (
            <option key={index + 1} value={quality.height}>
              {quality.height}p
            </option>
          );
        })}
      </select>

      <div
        className={`absolute top-0 bg-black h-full w-full text-center font-bold pt-8 text-gray-400 ${
          errorPLayingVideo ? " visible" : "hidden"
        }`}
      >
        <p>
          The media could not be loaded, either because the server or network
          failed or because the format is not supported.
        </p>
      </div>
    </>
  );
};

export default VideoPlayer;
