import type { Metadata } from "next";
import localFont from 'next/font/local'
import background from '../public/site-background.jpg'
import "./globals.css";

export const metadata: Metadata = {
  title: "Balatrodle",
  description: "Guess the today joker",
};

export const balatro = localFont({
  src: '../public/fonts/balatro.otf',
  variable: '--font-balatro',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-[100%]">
      <body className="bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background.src})` }}>
        {children}
      </body>
    </html>
  );
}
