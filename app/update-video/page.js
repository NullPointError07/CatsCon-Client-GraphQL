"use client";

import Link from "next/link";

import { useState } from "react";

import { UPDATE_CAT } from "@/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";
import { GET_CAT_BY_ID } from "@/graphql/queries";

const UpdateVideo = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const videoID = searchParams.get("id");

  const [updateCat, { error }] = useMutation(UPDATE_CAT);

  const { data } = useQuery(GET_CAT_BY_ID, {
    variables: {
      catId: videoID,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState();

  const prevData = data && data?.findCatById;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e.target.files ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    await updateCat({
      variables: {
        updateCatInput: {
          _id: videoID,
          title: formData?.title,
          description: formData?.description,
          tags: formData?.tag,
        },
      },
      // context: {
      //   headers: {
      //     Authorization: `Bearer ${session?.user?.accessToken}
      //     `,
      //     "apollo-require-preflight": true,
      //   },
      // },
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
          className=" w-full max-w-2xl flex flex-col gap-7 glassmorphism"
          encType="multipart/form-data"
        >
          <label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={prevData?.title}
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>

          <label>
            <textarea
              style={{ resize: "none" }}
              rows={4}
              type="text"
              placeholder="Description"
              name="description"
              value={prevData?.description}
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Tags #adorable, #orange, #aww, etc."
              value={prevData?.tags[0]}
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            <Button
              type="submit"
              // disabled={submitting}
              onClick={handleSubmit}
              className="px-5 py-1.5 text-sm btn-primary rounded-full "
            >
              {submitting ? "Updateing..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateVideo;
