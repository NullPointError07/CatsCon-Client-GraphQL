import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const SignUpModal = ({ toggleModal, toggleSignUpModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      if (password != confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccess("User create Successfully");
        toggleSignUpModal();
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log("error occured", error);
    }

    // Close the modal
    // toggleModal();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-100 flex justify-center items-center">
      <div className="bg-[#f8fbff] text-center p-6 relative rounded-lg">
        <button
          className="close-button absolute top-0 right-6 bg-[#d4e8ff] rounded-lg p-1 mt-4"
          onClick={toggleModal}
        >
          <AiOutlineClose />
        </button>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center items-end ">
            <Image src="/CatsIcon.png" alt="CatsIcon" width={75} height={25} />
            <h1 className="theme-1 text-2xl text-bold">
              Cats<span className="theme-2">Con</span>
            </h1>
          </div>
          <p className="theme-2">Welcome To CatsCon</p>
          <p className="text-gray-400 text-xs pb-4">
            Register to your account - share your adorable cat video.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="modal-body space-y-4 ">
          {/* Name field */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#d4e8ff] rounded-lg py-2 px-10 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* Email field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#d4e8ff] rounded-lg py-2 px-10 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* Password field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-10 block w-full rounded-lg bg-[#d4e8ff] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              {showPassword ? (
                <AiOutlineEye
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          {/* Confirm Password field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-2 px-10 block w-full rounded-lg bg-[#d4e8ff] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              {showPassword ? (
                <AiOutlineEye
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {success}
            </div>
          )}

          <button className="btn-primary my-4">Create Account</button>
        </form>

        <div className="modal-footer mt-4">
          <h1>
            Already Have an Account?{" "}
            <button
              onClick={toggleSignUpModal}
              className="bg-[#04aeee] p-1 rounded-lg text-white"
            >
              Sign In
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
