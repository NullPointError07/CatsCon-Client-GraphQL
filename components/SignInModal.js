"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import SignUpModal from "./SignUpModal";
import { signIn } from "next-auth/react";

const SignInModal = ({ toggleModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [signUpModal, setSignUpModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsAgreedChange = () => {
    setTermsAgreed(!termsAgreed);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("does this work");

    if (!email || !password) {
      setError("All fields are required");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        // termsAgreed,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      if (res.ok) {
        toggleModal();
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // Close the modal
    // toggleModal();
  };

  const toggleSignUpModal = () => {
    setSignUpModal(!signUpModal);
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-100  flex justify-center items-center">
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
            <h1 className="theme-1 text-2xl font-extrabold">
              Cats<span className="theme-2">Con</span>
            </h1>
          </div>
          <p className="theme-2">Welcome To CatsCon</p>
          <p className="text-gray-400 text-xs pb-4">
            Login to your account - share your adorable cat video
          </p>
        </div>

        <form onSubmit={handleSignIn} className="modal-body space-y-4">
          {/* email field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#d4e8ff] rounded-lg py-2 px-10 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {/* password field */}
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
          {/* 
          <label>
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={handleTermsAgreedChange}
              className="my-4 mr-2"
            />
            Agreed to terms and conditions
          </label> */}

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <div>
            <button className="btn-primary">Sign In</button>
          </div>
        </form>

        <div className="modal-footer"></div>

        <div className="flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <div className="mx-2">or</div>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div>
          <h1>
            Dont Have an Account?{" "}
            <button
              onClick={toggleSignUpModal}
              className="bg-[#04aeee] p-1 rounded-lg text-white"
            >
              SignUp
            </button>
          </h1>
        </div>

        {signUpModal && (
          <div>
            <SignUpModal
              toggleModal={toggleModal}
              toggleSignUpModal={toggleSignUpModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
