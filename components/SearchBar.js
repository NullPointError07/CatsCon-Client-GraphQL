"use client";

import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [optionDropDown, setOptionDropDown] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const catOptions = ["Black", "Calcio", "Orange", "White"];

  return (
    <div className="flex ">
      <div>
        <input type="text" placeholder="Search by Title or Tags" />
      </div>

      <button
        onClick={() => setOptionDropDown(!optionDropDown)}
        className="relative flex justify-between items-center border border-gray-500 rounded-xl p-3 "
      >
        <h1 className="pl-3 pr-10 text-xl">Tags</h1>
        {optionDropDown ? (
          <RiArrowDropDownLine
            size={40}
            className="ml-2 transform rotate-180"
          />
        ) : (
          <RiArrowDropDownLine size={40} className="ml-2 " />
        )}
      </button>

      {optionDropDown && (
        <div className="flex absolute top-auto">
          {catOptions.map((option, index) => (
            <label
              key={index}
              className="container flex items-center space-x-2 cursor-pointer text-xl text-gray-800"
            >
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="hidden"
              />
              <div
                className={`w-6 h-6 border border-gray-300 rounded-full bg-gray-200 flex justify-center items-center ${
                  selectedOption === option ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedOption === option ? "bg-white" : "bg-gray-200"
                  }`}
                ></div>
              </div>
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
