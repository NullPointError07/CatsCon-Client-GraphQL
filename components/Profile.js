import { useSession } from "next-auth/react";
import VideoCard from "./VideoCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();

  return (
    <div className="2xl:px-[140px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[22px]  my-6">
      <div className="text-right">
        <h1 className="text-3xl">
          Hello, <span className="text-[#4e9af0]">{session?.user?.name}</span>
        </h1>
        <p className="text-lg">{desc}</p>
        <p className="text-lg">Here are the videos you have uploaded</p>
      </div>
      <div className="my-10 grid lg:grid-cols-4 md:grid-cols-2 gap-4 cursor-pointer ">
        {data.map((post) => (
          <VideoCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
