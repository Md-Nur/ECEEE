import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { UserAuthProvider } from "./context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECEEE",
  description:
    "Electronics Club is organized by Electrical and Electronic Engineering department of University of Rajshahi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserAuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-324px)]">
            {children}
            <Toaster position="bottom-center" reverseOrder={false} />
          </main>
          <Footer />
        </UserAuthProvider>
      </body>
    </html>
  );
}
