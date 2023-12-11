import { useState } from "react";
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
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE_PICTURE } from "@/graphql/mutations";
import { IoCameraOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const ProfilePicture = ({ profilePicture }) => {
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
    <>
      <Image
        // src={profilePicture || "/Portrait_Placeholder.png"}
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
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
    </>
  );
};

export default ProfilePicture;
