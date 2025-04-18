import React from "react";
import { Parallax } from "react-scroll-parallax";

const VideoPlayer = ({ src, autoPlay = false, loop = false, muted = false, offset = "62%" }) => {
  return (
      <video
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
      >
        Your browser does not support the video tag.
      </video>
  );
};

export default VideoPlayer;