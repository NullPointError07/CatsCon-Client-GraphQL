"use client";

import Form from "@/components/Form";
import { CREATE_CAT } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateVideo = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState();

  const [createCat, { data, loading, error }] = useMutation(CREATE_CAT);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e.target.files ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setSubmitting(true);

    await createCat({
      variables: {
        createCatInput: {
          title: formData?.title,
          description: formData?.description,
          tags: formData?.tag,
          catVideo: formData?.file[0],
        },
      },
      context: {
        headers: {
          Autherization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlZEBnbWFpbC5jb20iLCJuYW1lIjoiUmVkIiwic3ViIjoiNjU1YjJmMjU1MGRiMGUxYjQ1ODVjNzk0IiwiaWF0IjoxNzAwNTQ5NTAxfQ.fynkVTpmVRm8olEDY1ByocPKbvhSRgevB18AwZezPRE",
          "apollo-require-preflight": true,
        },
      },
    });
  };

  return (
    <Form
      type="Create"
      submitting={submitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateVideo;
