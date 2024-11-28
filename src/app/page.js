import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar isLoggedIn={true} />

      <div className="flex flex-col w-full h-screen items-center justify-center gap-y-10">
        <Image
          src="/logo.svg"
          alt="Picture of the author"
          width={500}
          height={500}
        />

        <h1 className="text-4xl font-bold">Welcome to Game Vault</h1>
        <p className="text-lg">
          The website is under construction, please visit later!
        </p>
      </div>

      <Footer></Footer>
    </div>
  );
}
