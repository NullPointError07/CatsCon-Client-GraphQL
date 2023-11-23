"use client";

import { useEffect, useState } from "react";
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

const MainFeed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // search filter states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // paginaition states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const totalItems = allPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchPosts = async () => {
    const response = await fetch("/api/video");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.name) ||
        regex.test(item.tag) ||
        regex.test(item.title)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed my-12">
      <form className="border-2 rounded-lg py-4 px-6 mt-6 shadow-lg flex items-center justify-between">
        <div className="flex-1 pr-2">
          <input
            type="text"
            placeholder="Search by Title or Tags"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="px-3 py-4 block w-full rounded-lg bg-[#d4e8ff] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="px-1 md:px-3 py-4 bg-[#04aeee] text-white rounded-lg text-center w-1/4 sm:w-1/6">
          Search
        </div>
      </form>

      {searchText ? (
        <VideoCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      ) : (
        <VideoCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      )}

      <div className="pagination text-center space-x-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-pagination"
        >
          Previous
        </button>
        <span className="btn-pagination">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-pagination"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MainFeed;
