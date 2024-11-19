import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-y-10">
      <Image
        src="/logo.svg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <h1 className="text-4xl font-bold">Welcome to Game Vault</h1>
      <p className="text-lg">The website is under construction, please visit later!</p>
      <div className="flex flex-row justify-center items-center w-full gap-x-7 text-yellow-400 font-bold">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/shop"}>Shop</Link>


      </div>
    </div>
  );
}
