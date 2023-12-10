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

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file as needed
    console.log("Selected File:", selectedFile);
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
                    <Button size="sm" onPress={onClose} className="btn-primary">
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
      {/* <div className="my-10 grid lg:grid-cols-4 md:grid-cols-2 gap-4 cursor-pointer ">
        {data.map((post) => (
          <VideoCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Profile;
