"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
import { BsFilePerson } from "react-icons/bs";

import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import NavbarResponsive from "./NavbarResponsive";
import SignInModal from "./SignInModal";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = useRouter();

  const [dropdown, setDropDown] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: session } = useSession();

  // toggle function for Find Cats
  const toggleDropDown = () => {
    setDropDown(!dropdown);
  };
  // toggle function for navbar responsive
  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  // toggle Function for Modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const navItems = ["Find Cats", "Benefits", "FAQ", "About Us"];

  const handleCreateVdo = () => {
    router.push("/create-video");
    setDropDown(false);
  };

  const handleProfile = () => {
    router.push("/profile");
    setDropDown(false);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    const closeDropdownOnClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", closeDropdownOnClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnClick);
    };
  }, []);

  return (
    <div className=" flex w-full justify-between items-center bg-[#FFFFFF] sticky top-0 z-30 2xl:px-[140px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[22px] cursor-pointer">
      <div className="flex items-center space-x-0">
        <div>
          <button onClick={toggleNavbar} className="lg:hidden theme-1">
            <FaBars />
          </button>
        </div>
        <div>
          <Link href="/">
            <div className="flex items-center ">
              <Image
                src="/CatsIcon.png"
                alt="CatsIcon"
                width={75}
                height={25}
              />
              <h1 className="theme-1 text-2xl font-extrabold">
                Cats<span className="theme-2">Con</span>
              </h1>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex space-x-2 md:space-x-4 lg:space-x-8 text-xl pl-4">
          {navItems.map((item, idx) => (
            <ul key={idx}>
              <li className="hover:text-[#04aeee]">{item}</li>
            </ul>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Image
          src="/NotificationIcon.png"
          alt="Bell Icon"
          width={52}
          height={52}
        />
        {session ? (
          <div className="relative pt-1" ref={dropdownRef}>
            <button className="text-center" onClick={toggleDropDown}>
              <BsFilePerson size={40} />
            </button>
            {dropdown && (
              <div className="absolute right-0 top-[65px] bg-zinc-300 w-[240px] py-5 rounded-lg flex flex-col gap-3 md:gap-5 items-center">
                <Link href="/create-video">
                  <button onClick={handleCreateVdo} className="btn-primary">
                    Create Video
                  </button>
                </Link>
                <Link href="/profile">
                  <p
                    onClick={handleProfile}
                    className="text-3xl font-extrabold"
                  >
                    {session?.user?.name}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="btn-primary "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex gap-3 md:gap-5 items-center">
              <button
                onClick={toggleModal}
                className="btn-primary border-l-2 pl-2"
              >
                Sign In
              </button>
            </div>
          </>
        )}
      </div>

      {/* Responsive Navbar Section , might move to a new component */}
      {navbar && (
        <NavbarResponsive navItems={navItems} toggleNavbar={toggleNavbar} />
      )}

      {/* Modal Section for sign In purpose */}
      {modalOpen && (
        <div className=" absolute left-0 top-0 z-40">
          <SignInModal modalOpen={modalOpen} toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
