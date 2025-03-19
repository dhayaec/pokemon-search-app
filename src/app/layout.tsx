"use client";
import { store } from "@/redux/store";
// import type { Metadata } from "next";
import { Provider } from "react-redux";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container my-2 mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100">
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
