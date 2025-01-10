import React, { useEffect, useRef, useState } from "react";
import { HMSHLSPlayer, HMSHLSPlayerEvents } from "@100mslive/hls-player";

const VideoPlayer = ({ src, captions, poster }) => {
  const videoRef = useRef(null);
  const [errorPLayingVideo, setErrorPlayingVideo] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      setErrorPlayingVideo(false);
      const player = new HMSHLSPlayer(src, videoRef.current);

      player.hasCaptions(true);

      // Remove existing tracks to avoid duplicates
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
    }
  }, [src, captions]);

  return (
    <>
      <video
        ref={videoRef}
        controls
        preload="auto"
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
        }}
      ></video>
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
