import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

const NavbarResponsive = ({ navItems, toggleNavbar }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#ebf4fe] transition-transform translate-x-0 ease-in-out duration-300 lg:hidden">
      <div className="flex items-center justify-between px-4 bg-[#ffffff]">
        <div className="flex items-center">
          <Image src="/CatsIcon.png" alt="CatsIcon" width={75} height={25} />
          <h1 className="theme-1 text-2xl font-extrabold">
            Cats<span className="theme-2">Con</span>
          </h1>
        </div>
        <div className="bg-[#ebf4fe] p-1 rounded-lg">
          <button onClick={toggleNavbar} className="lg:hidden theme-1">
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 text-center pt-10 text-lg">
        {navItems.map((item, idx) => (
          <ul key={idx}>
            <li className="hover:text-[#04aeee]">{item}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default NavbarResponsive;
