import localFont from "next/font/local";
import "./globals.css";
import FooterComponent from "./components/Footer";
import Navbar from "./components/navbar";



export const metadata = {
  title: "Game Vault",
  description: "A place to store your favourite games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Navbar isLoggedIn= {"True"}/>
        {children}
        <FooterComponent/>

      </body>
      
    </html>

  );
}