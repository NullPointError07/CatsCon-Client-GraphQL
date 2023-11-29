import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "@/app/lib/mutations";
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
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  // if (loading) return "Signing Up...";
  // if (error) return `SignUp error! ${error.message}`;

  // {
  //   onCompleted: (data) => {
  //     // Handle successful signup
  //     console.log("User signed up:", data.signup);
  //     setSuccess("User created successfully");
  //     toggleSignUpModal();
  //   },
  //   onError: (error) => {
  //     // Handle signup error
  //     console.error("Signup error:", error.message);
  //     setErrorMsg("Error during signup. Please try again.");
  //   },
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // if (!name || !email || !password || !confirmPassword) {
    //   setErrorMsg("All fields are required");
    // }

    // if (password !== confirmPassword) {
    //   setErrorMsg("Passwords do not match");
    //   return;
    // }

    console.log(name, email, password);

    signupUser({
      variables: {
        signupInput: {
          userName: name,
          email,
          password,
        },
      },
    });

    // try {

    // } catch (error) {
    //   console.error("Error during signup:", error.message);
    //   setErrorMsg("Error during signup. Please try again.");
    // }
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
            placeholder="User Name"
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

          {errorMsg && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errorMsg}
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
