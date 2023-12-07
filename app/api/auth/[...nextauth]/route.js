import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN_USER } from "@/graphql/mutations";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: LOGIN_USER,
                variables: {
                  loginUserInput: {
                    email: email,
                    password: password,
                  },
                },
              }),
            }
          );

          const { data } = await response.json();

          const user = data?.login?.user;
          const accessToken = data?.login?.accessToken;

          if (!user) {
            throw new Error("Invalid email or password");
          }

          return {
            user,
            accessToken,
          };
        } catch (error) {
          console.error("Login failed:", error.message);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET_KEY,

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },

    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
