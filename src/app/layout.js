import localFont from "next/font/local";
import "./globals.css";
<<<<<<< HEAD
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
=======
import FooterComponent from "./components/footer";
>>>>>>> de2470281bb68fb8d8f492c01e308fb5cf5e5c6b


export const metadata = {
  title: "Game Vault",
  description: "A place to store your favourite games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <Navbar isLoggedIn={'True'}></Navbar>
  

        {children}
     <FooterComponent/>
      </body>
    </html>
  );
}
