import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";


export const metadata = {
  title: "Game Vault",
  description: "A place to store your favourite games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
     <Footer/>
      </body>
    </html>
  );
}
