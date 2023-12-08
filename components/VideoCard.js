import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import VideoPlayModal from "./VideoPlayModal";

const VideoCard = ({ cat, handleTagClick, handleEdit, handleDelete }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const { data: session } = useSession();
  const pathName = usePathname();

  const toggleVideoModal = () => {
    setShowVideoModal(!showVideoModal);
  };

  return (
    <div className="border-2 rounded-xl shadow p-4 hover:shadow-2xl cursor-pointer">
      <div className="relative">
        <video
          className="rounded-xl"
          src={cat?.catVideo ? `${cat?.catVideo}` : "cat-video.mp4"}
        />
        <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-black/30"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <BsPlayCircle
            onClick={() => {
              toggleVideoModal();
            }}
            className="text-white cursor-pointer"
            size={40}
          />
        </div>
      </div>
      {/* <h1 className="text-lg font-medium">
        <span className="text-xs">Uploaded by:</span> {cat?.creator?.userName}
      </h1> */}
      <h1 className="text-lg font-bold">{cat?.title}</h1>
      <p className="text-sm font-medium my-4 text-gray-700">
        {cat?.description}
      </p>
      <p
        className="font-extrabold text-[#04aeee] cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(cat?.tags)}
      >
        {cat?.tags}
      </p>

      {/* && pathName === "/profile" */}
      {session?.user?.user?._id === cat?.creator._id && (
        <div className="flex justify-center items-stretch pt-4 space-x-3">
          <p
            className="text-sm bg-green-500 p-1 rounded-lg text-white cursor-pointer"
            onClick={() => handleEdit(cat)}
          >
            Edit
          </p>
          <p
            className="text-sm bg-red-500 p-1 rounded-lg text-white cursor-pointer"
            onClick={() => handleDelete(cat)}
          >
            Delete
          </p>
        </div>
      )}

      {/* Render the VideoModal when showVideoModal is true. */}
      {showVideoModal && (
        <VideoPlayModal
          videoSrc={cat?.catVideo ? `${cat.catVideo}` : "cat-video.mp4"}
          onClose={toggleVideoModal}
        />
      )}
    </div>
  );
};

export default VideoCard;
