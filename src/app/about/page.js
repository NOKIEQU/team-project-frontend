import React from "react";
import Image from "next/image";
import Link from 'next/link';

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
            
            <div className="min-h-screen flex flex-col md:flex-row">
                
                <div className="hidden md:block md:w-2/5">
                    <div className="h-full w-full">
                        <video
                            src="/images/Aboutgame.mp4"
                            className="rounded-2xl object-cover w-full h-[115vh]"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>
            
                <div className="w-full md:w-3/5 flex flex-col md:pl-20">
                    <div className="h-auto flex items-center justify-center px-10 max-w-3xl pt-20">
                        <h1 className="text-4xl sm:text-7xl font-bold text-[#FFA800]">About Us</h1>
                    </div>
                    <div className="h-auto flex flex-col px-10 max-w-3xl space-y-4 pt-10">
                        <h2 className="text-xl sm:text-4xl font-bold text-[#FFA800] text-center">
                            Who Are We?
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Welcome to GameVault, the ultimate destination for games worldwide! Established in
                            2024, GameVault is on a mission to make gaming accessible, exciting, and convenient
                            for everyone. Our platform is built for players who are passionate about quality games
                            and appreciate a streamlined, easy shopping experience. Whether you're a casual gamer,
                            a hardcore competitor, or a collector, GameVault has something for you.
                        </p>

                        <h2 className="text-xl sm:text-4xl font-bold text-[#FFA800] mt-16 text-center">
                            More About Us
                        </h2>
                        <p className="text-gray-500 text-lg">
                            At GameVault, we don't just sell games—we unlock worlds! From epic quests to cozy
                            simulations, our vault is packed with adventures for every kind of gamer. Dive in and
                            discover your next obsession!
                        </p>

                        <div className="flex flex-row items-center justify-center gap-4 mt-60">
                            <Link href="/register">
                                <button className="text-black w-fit px-6 py-3 my-2 flex items-center rounded-md hover:scale-105 duration-500 bg-[#FFA800] hover:bg-[#fa9a00ef]">
                                    Sign up now
                                </button>
                            </Link>
                            <Link href="/shop">
                                <button className="text-black w-fit px-6 py-3 my-2 flex items-center rounded-md hover:scale-105 duration-500 bg-[#FFA800] hover:bg-[#fa9a00ef]">
                                    Shop now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="min-h-screen w-full bg-[#0d1b2a] pt-16">
                <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
                    <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline text-[#FFA800] text-center">
                        Keep Up to Date
                    </p>
                    <p className="py-6 text-lg text-center">Follow our social media handles:</p>

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
                        {techs.map(({id, src, title, style}) =>(
                            <div key={id}
                            className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}>
                                <img src={src} alt="" className="w-20 mx-auto" />
                                <p className="mt-4 text-black">{title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;