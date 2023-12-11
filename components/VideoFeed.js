"use client";

import { useQuery } from "@apollo/client";
import { GET_CATS } from "@/graphql/queries";

import { Pagination, Spinner } from "@nextui-org/react";
import VideoCard from "./VideoCard";

const VideoFeed = () => {
  const { loading, error, data } = useQuery(GET_CATS, {
    // pollInterval: 500,
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {loading && (
        <div>
          <Spinner className="items-center" size="lg" />
        </div>
      )}
      <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8 cursor-pointer ">
        {data &&
          data.catsAll?.map((cat) => <VideoCard key={cat._id} cat={cat} />)}
      </div>
    </>
  );
};

export default VideoFeed;
