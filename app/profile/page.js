"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import Swal from "sweetalert2";

import React from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-video?id=${post._id}`);
  };

  const handleDelete = async (post) => {
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
        await fetch(`api/video/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);

        Swal.fire("Deleted", "The video has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          "An error occurred while deleting the video.",
          "error"
        );
      }
    }
  };

  return (
    <Profile
      name="user"
      desc="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
