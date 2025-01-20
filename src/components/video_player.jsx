import React from "react";

const VideoPlayer = ({ src, autoPlay = false, loop = false, muted = false }) => {
  return (
    <video
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      style={{  position: "relative",
                top: "50%",
                left: "75%",
                width: "25%",
                height: "auto",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
                zIndex: -1 }} // Optional: Customize styles
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;