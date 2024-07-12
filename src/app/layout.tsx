import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import MainApp from "@/constant/MainApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intaimall Administration",
  description: "Managing intaimall products to show on main site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainApp>
          {children}
        </MainApp>
      </body>
    </html>
  );
}
