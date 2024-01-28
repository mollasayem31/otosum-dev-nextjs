import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "./context/GlobalStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OTOSUM",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalStateProvider>
        <body className={`${inter.className}`}>{children}</body>
      </GlobalStateProvider>
    </html>
  );
}
