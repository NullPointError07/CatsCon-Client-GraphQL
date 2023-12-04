import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { GET_USERS } from "@/graphql/queries";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // try {
        // const response = await axios.post(
        //   // `${process.env.NEXT_PUBLIC_SERVER_URI}`,
        //   "http://localhost:3001/graphql",
        //   console.log("resssss.....",response),
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        //     // body: JSON.stringify({ GET_USERS }),
        //   }
        // );
        // const { data } = await response.json();

        // const user = await data.users.find(
        //   (res) => res.email === credentials?.email
        // );
        // if (user && user.password === credentials?.password) {
        const user = {
          _id: "87632",
          email: credentials.email,
          password: credentials.password,
        };
        console.log("🚀 ~ file: route.js:56 ~ authorize ~ user:", user);
        if (user) {
          return user;
        } else {
          return null;
        }
        // } catch (error) {
        //   console.error("Login failed:", error.message);
        //   throw new Error("Invalid email or password");
        // }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
