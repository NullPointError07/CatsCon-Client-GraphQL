"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateVideo = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const videoID = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const getVideoDetails = async () => {
      if (videoID) {
        const response = await fetch(`/api/video/${videoID}`);
        const data = await response.json();

        // Use set functions to update state
        setTitle(data.title);
        setDescription(data.description);
        setTag(data.tag);
      }
    };

    getVideoDetails();
  }, [videoID]);

  // const handleFileChange = (e) => {
  //   setVideoFile(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const formData = new FormData();
    formData.append("userId", session.user.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    // formData.append("file", videoFile);

    try {
      const response = await fetch(`/api/video/${videoID}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Error uploading video.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#f1f7ff] w-full max-w-full grid lg:grid-cols-2 md:grid-cols-1 lg:px-16 md:px-10 sm:px-3 py-20  gap-10">
      <div className="p-12">
        <h1 className="text-[#034ea1] text-[38.4px]">
          <span className="blue_gradient">Update Video</span>
        </h1>
        <p className=" lg:text-left  max-w-md">
          Update and share your amazing cat videos with the world, and let
          capture beautiful moments of your cats and make everyone aww
        </p>
      </div>

      <div className="border-2 p-12 mx-12 shadow-lg rounded-lg">
        <form
          onSubmit={handleSubmit}
          className=" w-full max-w-2xl flex flex-col gap-7 glassmorphism"
          encType="multipart/form-data"
        >
          <label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#d4e8ff] rounded-lg block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          <label>
            <textarea
              style={{ resize: "none" }}
              rows={4}
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Tags #adorable, #orange, #aww, etc."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          {/* <label>
            <input
              type="file"
              placeholder="Upload Your Video"
              name="file"
              accept=".mp4"
            onChange={handleFileChange}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              // required
            />
          </label> */}

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm pr-4">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm btn-primary rounded-full "
            >
              {submitting ? "Updateing..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateVideo;
