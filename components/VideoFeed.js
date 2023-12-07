"use client";

import { GET_CATS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import VideoCard from "./VideoCard";

const VideoFeed = () => {
  const { loading, error, data } = useQuery(GET_CATS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data &&
        data.catsAll?.map((cat) => (
          <VideoCard cat={cat}/>
        ))}
    </div>
  );
};

export default VideoFeed;
