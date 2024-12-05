import localFont from "next/font/local";
import "./globals.css";
import FooterComponent from "./components/footer";
import Navbar from "./components/navbar";
import { CartProvider } from "../context/cart-context";



export const metadata = {
  title: "Game Vault",
  description: "A place to store your favourite games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar isLoggedIn={"True"}></Navbar>
        <CartProvider>
          {children}
          <FooterComponent />
        </CartProvider>

      </body>
      
    </html>

  );
}