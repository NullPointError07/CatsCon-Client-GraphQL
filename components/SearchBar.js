import { Button } from "@nextui-org/react";

const SearchBar = ({ handleSearchChange }) => {
  return (
    <>
      <form className="border-2 rounded-lg py-4 px-6 mt-6 shadow-lg flex items-center justify-between">
        <div className="flex-1 pr-2">
          <input
            type="text"
            placeholder="Search by Title or Tags"
            defaultValue={""}
            onChange={handleSearchChange}
            required
            className="px-3 py-4 block w-full rounded-lg bg-[#d4e8ff] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button className="px-1 md:px-3 py-4 bg-[#04aeee] text-white rounded-lg text-center w-1/4 sm:w-1/6">
          Search
        </Button>
      </form>
    </>
  );
};

export default SearchBar;
