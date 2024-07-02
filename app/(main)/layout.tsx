import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/themeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Management",
  description: "Event management system",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Header/>
      </AuthProvider>
      {children}
    </>
  );
}
