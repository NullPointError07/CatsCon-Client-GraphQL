import VideoCard from "./VideoCard";

const VideoCardList = ({ data, handleTagClick, currentPage, itemsPerPage }) => {
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8 cursor-pointer ">
      {currentItems.map((post) => (
        <VideoCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default VideoCardList;
