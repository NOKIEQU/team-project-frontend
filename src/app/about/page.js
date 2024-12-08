import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const techs = [
    {
      id: 1,
      src: "/images/instagram.jpg",
      title: "Instagram",
      style: "shadow-pink-500",
    },
    {
      id: 2,
      src: "/images/twitter.jpg",
      title: "Twitter",
      style: "shadow-green-500",
    },
    {
      id: 3,
      src: "/images/link.png",
      title: "LinkedIn",
      style: "shadow-orange-500",
    },
    {
      id: 4,
      src: "/images/facebook.jpg",
      title: "Facebook",
      style: "shadow-blue-500",
    },
    {
      id: 5,
      src: "/images/tiktok.png",
      title: "TikTok",
      style: "shadow-purple-500",
    },
    {
      id: 6,
      src: "/images/youtube.png",
      title: "YouTube",
      style: "shadow-red-500",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0d1b2a] overflow-x-hidden">
      <div className="shadow-xl">
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="hidden md:block md:w-2/5 shadow-xl">
          <div className="h-full w-full">
            <video
              src="/images/Aboutgame.mp4"
              className="rounded-2xl object-cover w-full h-[170vh]"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <div className="w-full md:w-3/5 flex flex-col md:pl-20 text-white pt-10 ml-10">
          <div className="h-auto flex flex-col items-center px-10 max-w-3xl pt-20">
            <h1 className="text-4xl sm:text-7xl font-bold text-center">
              About Us
            </h1>

            <div className="bg-[#f6a302] h-2 rounded-full w-2/6 mt-2 transition-all hover:w-4/6"></div>
          </div>
          <div className="h-auto flex flex-col px-10 max-w-3xl space-y-8 pt-10 text-left">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-4xl font-bold ">Who Are We?</h2>

              <p className=" text-base pb-10">
                Welcome to GameVault, the ultimate destination for games
                worldwide! Established in 2024, GameVault is on a mission to
                make gaming accessible, exciting, and convenient for everyone.
                Our platform is built for players who are passionate about
                quality games and appreciate a streamlined, easy shopping
                experience. Whether you're a casual gamer, a hardcore
                competitor, or a collector, GameVault has something for you.
                At GameVault, we pride ourselves on delivering quality games, an 
                effortless shopping experience, and a community for gamers
                 who share the same passion for discovery and adventure. 
                No matter what you play or how you play, GameVault is here to support your journey.
              </p>
            </div>
            <hr />

            <div className="space-y-4 mt-12">
              <h2 className="text-xl sm:text-4xl font-bold">Our Policy</h2>
              <p className="text-base">
              At GameVault, gaming is more than just entertainment—it's a gateway to new worlds. We don't just sell games; we open the door to epic quests, cozy simulations, and mind-bending challenges. Our curated collection has something for every gamer, whether you're 
              diving into multiplayer battles, embarking on solo adventures, or adding to your cherished collection.
              Our vault is packed with
                adventures for every kind of gamer. Dive in and discover your
                next obsession!
              </p>
            </div>

            <div className="flex flex-row items-center justify-centre gap-10 mt-16">
              <Link href="/register">
                <button className="text-white w-fit px-6 py-3 my-2 flex items-center rounded-md hover:scale-105 duration-500 bg-[#FFA800] hover:bg-[#fa9a00ef]">
                  Sign up now
                </button>
              </Link>
              <Link href="/shop">
                <button className="text-white w-fit px-6 py-3 my-2 flex items-center rounded-md hover:scale-105 duration-500 bg-[#FFA800] hover:bg-[#fa9a00ef] ">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="min-h-screen w-full bg-[#0d1b2a] pt-24">
        <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
          <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline text-[#FFA800] text-center">
            Keep Up to Date
          </p>
          <p className="py-6 text-lg text-center">
          Stay connected and informed by following us on social media for the latest news,
           offers, and gaming updates.
          </p>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
            {techs.map(({ id, src, title, style }) => (
              <div
                key={id}
                className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
              >
                <img src={src} alt="" className="w-20 mx-auto" />
                <p className="mt-4 text-white">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
