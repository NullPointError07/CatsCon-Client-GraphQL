"use client";

import { items } from "@/utils/faqitems";
import Image from "next/image";
import { useState } from "react";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border my-4">
    <button
      className={`w-full text-left py-3 px-4 ${
        isOpen ? "bg-secondary bg-opacity-10" : "bg-gray-200 hover:bg-gray-300"
      } focus:outline-none transition-colors`}
      onClick={onClick}
    >
      <p className="font-bold text-lg">{title}</p>
    </button>
    {isOpen && (
      <div className="p-4">
        <p>
          <strong>{content}</strong>
        </p>
      </div>
    )}
  </div>
);

const Accordion = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className=" my-6">
      <div className="text-center">
        <p className="fw-bolder text-5xl">Frequently Asked Questions</p>
        <p className="mt-3 mb-5">
          Some Frequently asked Questions by Our Users.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row h-auto w-full py-5 gap-4 lg:gap-10">
        <div
          className="text-start my-auto h-full w-full lg:w-[50%]"
          id="accordionExample"
        >
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openItem === index}
              onClick={() => setOpenItem(openItem === index ? null : index)}
            />
          ))}
        </div>
        <div className="flex-grow flex items-center justify-center h-full ">
          <Image
            src="/faq.png"
            alt="FAQ Image"
            width={600} // Adjust the width to your preference
            height={400} // Adjust the height to your preference
            className=" object-contain !max-h-[600px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
