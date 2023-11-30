"use client";

export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_USERS } from "../../graphql/queries";

export default function PollPage() {
  const { data } = useSuspenseQuery(GET_USERS);

  console.log("data", data);

  return (
    <div>
      {data.usersAll.map((user) => (
        <div key={user._id}>
          <p>User ID: {user._id}</p>
          <p>User Name: {user.userName}</p>
          <p>Email: {user.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
