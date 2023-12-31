import { Button } from "@nextui-org/react";
import Link from "next/link";

const Form = ({
  type,
  title,
  description,
  tag,
  submitting,
  handleChange,
  handleSubmit,
}) => {
  return (
    <section className="bg-[#f1f7ff] w-full max-w-full grid lg:grid-cols-2 md:grid-cols-1 lg:px-16 md:px-10 sm:px-3 py-20  gap-10">
      <div className="p-12">
        <h1 className="text-[#034ea1] text-[38.4px]">
          <span className="blue_gradient">{type} Video</span>
        </h1>
        <p className=" lg:text-left  max-w-md">
          {type} and share your amazing cat videos with the world, and let
          capture beautiful moments of your cats and make everyone aww
        </p>
      </div>

      <div className="border-2 p-12 mx-12 shadow-lg rounded-lg">
        <form
          className=" w-full max-w-2xl flex flex-col gap-7 glassmorphism"
          encType="multipart/form-data"
        >
          <label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          <label>
            <textarea
              style={{ resize: "none" }}
              rows={4}
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Tags #adorable, #orange, #aww, etc."
              name="tag"
              value={tag}
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          <label>
            <input
              type="file"
              placeholder="Upload Your Video"
              name="file"
              accept=".mp4"
              onChange={handleChange}
              className="bg-[#d4e8ff] rounded-lg  block w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </label>

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm pr-4">
              Cancel
            </Link>

            <Button
              type="submit"
              // disabled={submitting}
              onClick={handleSubmit}
              className="px-5 py-1.5 text-sm btn-primary rounded-full "
            >
              {submitting ? `${type}ing...` : type}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
