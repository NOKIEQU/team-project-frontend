import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className=" bg-gray-800 text-white font-">
      <Navbar isLoggedIn={true} />

      <div class="relative h-screen w-full">
        <img
          src="league.jpeg"
          class="h-full w-full object-cover"
          alt="League Image"
        />

        <div className="absolute top-0 right-0 h-full w-1/2 bg-gray-800 opacity-100%">
          <div className="flex flex-col w-full h-screen  p-40 pt-60 justify-left gap-y-10">
            <h1 className="text-5xl font-bold text-left">
              We are on <span className="text-orange-500">TOP</span> of our game
            </h1>

            <p className="text-lg">
              blahadabwdajkwdnajdnwajkdnawjkdnawldnalwkdnawlkdnawlkdnalwkdnalwkndalkw
            </p>
            <p>Start Your Journey!</p>

            <div className="flex w-full justify-left gap-x-6 -ml-4">
            <Link href={'/shop'}>  <button className="m-4 bg-[#FFA800] hover:bg-orange-500 font-bold py-4 px-4 rounded-xl w-40 transition transform hover:scale-110">
             SEARCH NOW
              </button> </Link>
              <button className="m-4 bg-[#FFA800] hover:bg-orange-500 font-bold py-3 px-5 rounded-xl w-40 transition transform hover:scale-110">
               TAKE QUIZ
              </button>
            </div>

            <div class="flex w-full items-center justify-left gap-x-6 mt-15 ">
              <img
                src="league1.webp"
                className="w-3/6 rounded-md transition-transform hover:scale-110"
              />
              <img
                src="callofduty.jpg"
                className="w-3/6 rounded-md transition-transform hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
