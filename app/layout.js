import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Footer from "@/components/Footer";


export const metadata = {
  title: "CatsCon",
  description: "Cat Video Uploading Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <AuthProvider>
          <Navbar /> {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
