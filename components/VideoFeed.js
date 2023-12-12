"use client";

import { useQuery } from "@apollo/client";
import { GET_CATS } from "@/graphql/queries";
import { Spinner } from "@nextui-org/react";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SearchBar from "./SearchBar";

const VideoFeed = () => {
  const [searchResult, setSearchResult] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_CATS);

  useEffect(() => {
    refetch();
  }, []);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  useEffect(() => {
    if (!loading) {
      setSearchResult(data?.catsAll);
    }
  }, [loading]);

  const fuseOptions = {
    keys: ["title", "tags", "creator.userName"],
    threshold: 0.3,
    // minMatchCharLength: 2,
  };

  const fuse = new Fuse(data?.catsAll, fuseOptions);

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setSearchResult(data?.catsAll);
    } else {
      const results = fuse.search(e.target.value);
      const actResults = results?.map((val) => val.item);

      setSearchResult(actResults);
    }
  };

  return (
    <>
      <SearchBar handleSearchChange={handleSearchChange} />

      {loading ? (
        <div>
          <Spinner className="items-center" size="lg" />
        </div>
      ) : (
        <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8 cursor-pointer">
          {searchResult.map((cat) => (
            <VideoCard key={cat._id} cat={cat} />
          ))}
        </div>
      )}
    </>
  );
};

export default VideoFeed;
