"use client";

import Form from "@/components/Form";
import { CREATE_CAT } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

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

    setSubmitting(true);

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
          Authorization: `Bearer ${session?.user?.accessToken}
          `,
          "apollo-require-preflight": true,
        },
      },
    });
    if (!error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Updated Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/");
    }
  };

  return (
    <Form
      type="Upload"
      submitting={submitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateVideo;
