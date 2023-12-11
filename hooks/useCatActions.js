// useCatActions.js
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { DELETE_CAT } from "@/graphql/mutations";
import { GET_CATS, GET_USER_BY_ID } from "@/graphql/queries";
import { useRouter } from "next/navigation";

export const useCatActions = () => {
  //   const router = useRouter();
  const [deleteCat] = useMutation(DELETE_CAT);

  const handleEdit = (router, cat) => {
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
          refetchQueries: [{ query: GET_USER_BY_ID }],
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

  return { handleEdit, handleDelete };
};
