"use client";

import { useSession } from "next-auth/react";

import Profile from "@/components/Profile";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "@/graphql/queries";

const MyProfile = () => {
  const { data: session } = useSession();

  const sessionUser = session?.user?.user?._id;

  const { data, error, loading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: sessionUser,
    },
  });
  console.log("data", data);

  return <Profile name="user" desc="Welcome to your profile" data={data} />;
};

export default MyProfile;
