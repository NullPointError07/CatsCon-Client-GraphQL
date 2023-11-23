"use client";

import Form from "@/components/Form";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateVideo = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const formData = new FormData();
    formData.append("userId", session.user.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("file", videoFile);

    try {
      const response = await fetch("/api/video/new", {
        method: "POST",
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
    <Form
      type="Create"
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      tag={tag}
      setTag={setTag}
      submitting={submitting}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateVideo;
