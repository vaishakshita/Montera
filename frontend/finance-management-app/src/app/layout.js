import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Baloo_Bhai_2 } from 'next/font/google';
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_Bhai_2({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: "smart finance management system",
  description: "Track your income, monitor expenses, and gain insights into your spending habits - all in one simple and secure platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300">
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
          }}
        />
      </body>
    </html>
  );
}
