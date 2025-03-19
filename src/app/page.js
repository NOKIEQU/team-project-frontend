"use client";
import Image from "next/image";
import Link from "next/link";
import GameCard from "./components/gameCard";
import { useState, useEffect } from "react";

export default function Home() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://51.77.110.253:3001/api/genres");
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const button =
    "bg-gradient-to-r from-gray-900 to-gray-700 text-white flex items-center justify-center rounded-md shadow-md hover:shadow-xl transition-transform hover:scale-105 w-full sm:w-80 p-6 font-semibold text-lg";

  return (
    <div className="min-h-screen bg-[#1A1A22] text-white font-oswald">
      {/* Hero Section with Video */}
      <div className="relative shadow-xl">
        <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
          <source src="league_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A22] via-black/60 to-transparent">
          <div className="flex flex-col w-full h-full px-6 lg:px-12 lg:pt-20 gap-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-centre">
              We are on <span className="text-[#f6a302]">TOP</span> of our game
            </h1>
            <div className="bg-white h-2 rounded-full w-1/4 lg:w-1/5 mt-2 transition-all hover:w-3/4"></div>

            <p className="text-lg lg:text-xl leading-relaxed">
              <span className="font-bold text-xl lg:text-2xl">Start Your Journey </span>
              in the world of gaming. Whether you're a seasoned player or just
              starting, we have everything you need to explore and grow. The adventure starts now!
            </p>

            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              <Link href="/shop">
                <button className="bg-[#F0ECEC] text-black font-bold py-3 px-6 rounded-md hover:bg-[#e89502] transition transform hover:scale-105">
                  SEARCH NOW
                </button>
              </Link>
              <Link href="/Questionnaire">
                <button className="bg-[#F0ECEC] text-black font-bold py-3 px-6 rounded-md hover:bg-[#e89502] transition transform hover:scale-105">
                  TAKE QUIZ
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <img src="league1.webp" className="w-full rounded-lg transition-transform hover:scale-105 shadow-lg" />
              <img src="callofduty.jpg" className="w-full rounded-lg transition-transform hover:scale-105 shadow-lg" />
            </div>
          </div>
        </div>
      </div>

     {/* Why We Are the Best Section */}
<div className="flex flex-col lg:flex-row w-full bg-[#1A1A22] py-16 px-8 lg:px-20 shadow-xl">
  <div className="w-full lg:w-1/2 flex justify-center">
    <img
      src="fantasy.webp"
      className="w-3/4 rounded-lg transition-transform hover:scale-105 shadow-lg"
      alt="Fantasy"
    />
  </div>
  <div className="w-full lg:w-1/2 mt-10 lg:mt-16 lg:pl-10 text-center lg:text-left">
    <h1 className="text-4xl font-extrabold">WHY WE ARE THE BEST</h1>
    <div className="bg-white h-2 rounded-full w-1/5 mt-3 mb-6 transition-all hover:w-3/5"></div>
    <p className="text-lg leading-relaxed">
      Explore why we are at the top. From curated collections to expert reviews, we bring you the best in gaming.
    </p>
    <Link
      href="/about"
      className="inline-block mt-6 bg-[#F0ECEC] text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
    >
      Read More
    </Link>
  </div>
</div>


      {/* Our Top Games Section */}
      <div className="flex flex-col w-full min-h-screen pt-28 items-center shadow-xl">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Our <span className="text-[#f6a302]">TOP</span> Games
        </h1>
        <div className="bg-[#F0ECEC] h-2 rounded-full w-1/3 lg:w-1/6 transition-all hover:w-2/6 mt-5"></div>

        {/* Grid Layout for Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-screen-lg px-4">
          {[ 
            { image: "/GameCards/mortalcombat.jpeg", title: "Mortal Combat", price: "£50" },
            { image: "/GameCards/assasins.jpg", title: "Assassins Creed", price: "£45" },
            { image: "/GameCards/EldenRing.jpg", title: "Elden Ring", price: "£60" },
            { image: "/GameCards/halo.jpg", title: "Halo", price: "£30" },
            { image: "/GameCards/lastofus.webp", title: "Last of Us", price: "£50" },
            { image: "/GameCards/returnal.jpg", title: "Returnal", price: "£40" },
          ].map((game, index) => (
            <div key={index} className="p-4 bg-[#1A1A22] rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <GameCard image={game.image} title={game.title} price={game.price} description="An open-world adventure" />
            </div>
          ))}
        </div>
      </div>

      {/* Explore Game Genres */}
      <div className="flex flex-col w-full pt-24 pb-32 items-center">
        <h1 className="text-4xl lg:text-6xl font-bold">Explore Game Genres</h1>
        <div className="bg-[#F0ECEC] h-2 rounded-full w-1/3 lg:w-1/6 transition-all hover:w-2/6 mt-5"></div>

        {/* Grid Layout for Genres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-screen-lg mt-10">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/shop?genre=${encodeURIComponent(genre.name)}`}>
              <button className="bg-[#F0ECEC] text-black font-bold py-6 px-8 rounded-md hover:bg-[#e89502] transition transform hover:scale-105 w-full">
                {genre.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
