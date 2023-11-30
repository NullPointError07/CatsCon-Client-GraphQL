import "./globals.css";
import { AuthProvider } from "./Providers/AuthProvider";
import { ApolloWrapper } from "./Providers/ApolloWrapper";
import { NextuiProvider } from "./Providers/NextUIProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CatsCon",
  description: "Cat Video Uploading Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextuiProvider>
          <ApolloWrapper>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
            </AuthProvider>
          </ApolloWrapper>
        </NextuiProvider>
      </body>
    </html>
  );
}
