import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import Providers from "./providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexel",
  description: "Nexel is a platform for developers to build and deploy web applications."
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <Providers>
        <body className="min-h-screen flex flex-col text-vellum antialiased">
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
