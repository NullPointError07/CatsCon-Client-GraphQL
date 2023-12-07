"use client";

import { GET_CATS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import VideoCard from "./VideoCard";

const VideoFeed = () => {
  const { loading, error, data } = useQuery(GET_CATS);
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <Spinner className="items-center" size="lg" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleEdit = (cat) => {
    router.push(`/update-video?id=${cat._id}`);
  };

  return (
    <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8 cursor-pointer ">
      {data &&
        data.catsAll?.map((cat) => (
          <VideoCard cat={cat} handleEdit={handleEdit} />
        ))}
    </div>
  );
};

export default VideoFeed;
