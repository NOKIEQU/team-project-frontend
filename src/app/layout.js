import localFont from "next/font/local";
import "./globals.css";
import FooterComponent from "../app/components/footer";
import { CartProvider } from '../context/cart-context';

export const metadata = {
  title: "Game Vault",
  description: "A place to store your favourite games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <FooterComponent />
        </CartProvider>

      </body>
    </html>
  );
}
