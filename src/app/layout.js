import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import { CartProvider } from "../context/cart-context";
import { UserProvider } from "../context/user-context";


export const metadata = {
  title: "Game Vault",
  description: "A place to store your favourite games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <CartProvider>
            <Navbar />

            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>

    </html>

  );
}