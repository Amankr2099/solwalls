import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Comment } from "@/components/Comment";
import { Providers } from "@/providers/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// app/layout.tsx or app/layout.js
export const metadata = {
  title: 'SolWalls',
  description: 'Your Wallpaper Downloding Site',
  icons: {
    icon: '/wallpaper-svg.svg', // ← Your custom favicon
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Comment />
          <Footer />
        </Providers>

        <Script src="https://kit.fontawesome.com/d73a96e594.js" crossorigin="anonymous" />
      </body>

    </html>
  );
}
