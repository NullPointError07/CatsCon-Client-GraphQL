import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { UPDATE_USER } from "@/graphql/mutations";
import Swal from "sweetalert2";

const ProfileUpdate = ({ data, session }) => {
  const router = useRouter();
  const prevData = data;
  const [formData, setFormData] = useState(prevData);

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setFormData(prevData);
  }, [prevData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e?.target?.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUser({
      variables: {
        updateUserInput: {
          _id: session?.user._id,
          userName: formData?.userName,
          email: formData?.email,
          age: parseInt(formData?.age),
          address: formData?.address,
          bio: formData?.bio,
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
      router.push("/profile");
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="btn-primary">
        Update Profile
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Update Your Profile
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="UserName"
                  placeholder="Enter your UserName"
                  name="userName"
                  value={formData?.userName}
                  onChange={handleChange}
                  className="background-theme-1 rounded-lg"
                  variant="bordered"
                />
                <Input
                  label="Email"
                  placeholder="Enter your Email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  className="background-theme-1 rounded-lg"
                  variant="bordered"
                />
                <Input
                  label="Age"
                  placeholder="Enter your Age"
                  name="age"
                  value={formData?.age}
                  onChange={handleChange}
                  className="background-theme-1 rounded-lg"
                  variant="bordered"
                />
                <Input
                  label="Address"
                  placeholder="Enter your Address"
                  name="address"
                  value={formData?.address}
                  onChange={handleChange}
                  className="background-theme-1 rounded-lg"
                  variant="bordered"
                />
                <Input
                  label="Bio"
                  placeholder="Enter your Bio"
                  name="bio"
                  value={formData?.bio}
                  onChange={handleChange}
                  className="background-theme-1 rounded-lg"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
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

export default ProfileUpdate;
