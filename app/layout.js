import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "./Providers/authProviders";
import Footer from "@/components/Footer";
import { ApolloWrapper } from "./lib/apollo-wrapper";

export const metadata = {
  title: "CatsCon",
  description: "Cat Video Uploading Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
