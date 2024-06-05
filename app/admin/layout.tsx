import type { Metadata } from "next";
import "../globals.css";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <AdminSidebar />
          </div>
          <div className="flex flex-col">
            <AdminHeader />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}