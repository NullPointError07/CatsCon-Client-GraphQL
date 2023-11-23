import React from "react";

const VideoPlayModal = ({ videoSrc, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="relative">
        <video className="rounded-xl" controls autoPlay src={videoSrc} />
        <button
          className="absolute top-2 right-2 text-red-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VideoPlayModal;
