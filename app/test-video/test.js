<div className="border-2 rounded-xl shadow p-4 hover:shadow-2xl cursor-pointer">
  <div className="relative">
    <video
      className="rounded-xl"
      src={
        data?.catsAll?.catVideo ? `${data?.catsAll?.catVideo}` : "cat-video.mp4"
      }
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
  <h1 className="text-lg font-medium">
    <span className="text-xs">Uploaded by:</span> {data?.catsAll?.title}
  </h1>
  <h1 className="text-lg font-bold">{data?.catsAll?.title}</h1>
  <p className="text-sm font-medium my-4 text-gray-700">
    {data?.catsAll?.description}
  </p>
  <p
    className="font-extrabold text-[#04aeee] cursor-pointer"
    onClick={() => handleTagClick && handleTagClick(data?.catsAll?.tag)}
  >
    {data?.catsAll?.tag}
  </p>

  {/* Render the VideoModal when showVideoModal is true. */}
  {showVideoModal && (
    <VideoPlayModal
      videoSrc={post?.file ? `${post.file.location}` : "cat-video.mp4"}
      onClose={toggleVideoModal}
    />
  )}
</div>;
