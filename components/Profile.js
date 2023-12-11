import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { IoCameraOutline } from "react-icons/io5";
import VideoCard from "./VideoCard";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE_PICTURE } from "@/graphql/mutations";
import Swal from "sweetalert2";

const Profile = ({ name, desc, data }) => {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [updateProfilePic, { error }] = useMutation(
    UPDATE_USER_PROFILE_PICTURE
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleProfilePicUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      await updateProfilePic({
        variables: {
          updateProfilePicture: {
            _id: data?.userById?._id,
            profilePicture: selectedFile,
          },
        },
        context: {
          headers: {
            "apollo-require-preflight": true,
          },
        },
      });
      if (!error) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile Picture Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Updatting Profile Picture",
        });
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div className="2xl:px-[140px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[22px]  my-6">
      <div className="flex justify-between">
        <div className="relative">
          <Image
            src="/Portrait_Placeholder.png"
            alt="user picture"
            width={300}
            height={300}
            className="rounded-full"
          />
          <Button
            size="sm"
            className="absolute bottom-0 right-0 text-black rounded-full"
            onPress={onOpen}
          >
            <IoCameraOutline />
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Update Profile Picture
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      className="bg-[#d4e8ff] rounded-lg "
                      variant="bordered"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onPress={onClose}
                      className="btn-primary"
                      onClick={handleProfilePicUpdate}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="text-right">
          <h1 className="text-3xl">
            Hello,{" "}
            <span className="text-[#4e9af0]">
              {session?.user?.user?.userName}
            </span>
          </h1>
          <p className="text-lg">{desc}</p>
          <p className="text-lg">Here are the videos you have uploaded</p>
        </div>
      </div>
      <div className="my-10 grid lg:grid-cols-4 md:grid-cols-2 gap-4 cursor-pointer ">
        {data?.userById?.userVideos?.map((cat) => (
          <VideoCard key={cat._id} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
