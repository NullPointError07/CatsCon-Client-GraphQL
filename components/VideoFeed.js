"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import { GET_CATS } from "@/graphql/queries";
import { DELETE_CAT } from "@/graphql/mutations";

import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
import VideoCard from "./VideoCard";

const VideoFeed = () => {
  const { loading, error, data } = useQuery(GET_CATS, {
    // pollInterval: 500,
  });
  const [deleteCat] = useMutation(DELETE_CAT);
  const router = useRouter();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleEdit = (cat) => {
    router.push(`/update-video?id=${cat._id}`);
  };

  const handleDelete = async (cat) => {
    const result = await Swal.fire({
      title: "Delete Video",
      text: "Are you sure you want to delete this video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#04aeee",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteCat({
          variables: {
            catId: cat._id,
          },
          refetchQueries: [{ query: GET_CATS }],
        });
      } catch (error) {
        console.error("Error deleting cat:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the video.",
          "error"
        );
      }
    }
  };

  return (
    <>
      {loading && (
        <div>
          <Spinner className="items-center" size="lg" />
        </div>
      )}
      <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8 cursor-pointer ">
        {data &&
          data.catsAll?.map((cat) => (
            <VideoCard
              key={cat._id}
              cat={cat}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </>
  );
};

export default VideoFeed;
