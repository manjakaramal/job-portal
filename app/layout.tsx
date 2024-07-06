import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/app/ui/navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Job Portal",
  description: "Created by Manjakaraml",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <NavBar />
          </div>
          <div className="flex-grow pl-3 pr-3 md:overflow-y-auto md:p-12">
            {children} 
            <br />
          </div>
        </div>
        
      </body>
    </html>
  );
}
