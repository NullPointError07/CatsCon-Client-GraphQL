import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Footer from "@/components/Footer";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./graphql/gql.setup";

export const metadata = {
  title: "CatsCon",
  description: "Cat Video Uploading Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={graphqlClient}>
          <AuthProvider>
            <Navbar /> {children}
            <Footer />
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
