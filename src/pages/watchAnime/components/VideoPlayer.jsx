import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ src, captions, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize Video.js
      const player = window.videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        responsive: true,
        fluid: true,
      });

      player.src({
        src: src,
        type: "application/x-mpegURL",
      });

      // Add captions (if provided)
      if (captions && captions.length > 0) {
        captions.forEach((caption) => {
          player.addRemoteTextTrack(
            {
              kind: "subtitles",
              src: caption.file, // Caption file URL
              label: caption.label, // Label displayed in UI
              default: caption.default,
            },
            false // Do not automatically show this track
          );
        });
      }
    }
  }, [src]);

  return (
    <div
      data-vjs-player
      /* style={{
        height: "350px",
        width: "100%",
        minHeight: "350px",
        maxHeight: "350px",
      }} */
    >
      <video
        ref={videoRef}
        id="my-video"
        className="video-js vjs-theme-fantasy"
        style={{ width: "100%", height: "100%", backgroundColor: "black" }}
      >
        {/* {captions.map((track, index) => {
          if (!track) return;
          return (
            <track
              key={index}
              kind={track.kind}
              src={track.file}
              label={track.label}
              default={track.default}
            />
          );
        })} */}
      </video>
    </div>
  );
};

export default VideoPlayer;
