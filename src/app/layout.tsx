"use client";
import { store } from "@/redux/store";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container my-2 mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
