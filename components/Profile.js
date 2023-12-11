import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import VideoCard from "./VideoCard";
import ProfilePicture from "./ProfilePicture";
import ProfileUpdate from "./ProfileUpdate";

const Profile = ({ name, desc, data }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="2xl:px-[140px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[22px] my-6">
      <div className="flex justify-between">
        <div className="relative">
          <ProfilePicture profilePicture={data?.userById?.profilePicture} />
        </div>
        <div className="text-right">
          <h1 className="text-3xl">
            Hello,{" "}
            <span className="text-[#4e9af0]">
              {session?.user?.user?.userName}
            </span>
          </h1>
          <p className="text-lg">{desc}</p>
          <p className="text-lg">Here are the videos you have uploaded</p>
        </div>
      </div>
      <div className="mt-10 flex justify-end gap-5">
        <Button
          onClick={() => router.push("/create-video")}
          className="btn-primary"
        >
          Upload Video
        </Button>

        <ProfileUpdate data={data?.userById} session={session?.user} />
      </div>
      <div className="my-10 grid lg:grid-cols-4 md:grid-cols-2 gap-4 cursor-pointer ">
        {data?.userById?.userVideos?.map((cat) => (
          <VideoCard key={cat._id} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
