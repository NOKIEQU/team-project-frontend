import React from "react";
import Image from "next/image";


const About = () => {
    const techs = [
        {
            id: 1,
            src: "/images/instagram.jpg",
            title: 'Instagram',
            style: 'shadow-pink-500'

        },
        {
            id: 2,
            src: "/images/twitter.jpg",
            title: 'Twitter',
            style: 'shadow-green-500'
            
        },
        {
            id: 3,
            src: "/images/link.png",
            title: 'Linkedin',
            style: 'shadow-orange-500'
            
        },
        {
            id: 4,
            src: "/images/facebook.jpg",
            title: 'Facebook',
            style: 'shadow-blue-500'
            
        },
        {
            id: 5,
            src: "/images/tiktok.png",
            title: 'Tiktok',
            style: 'shadow-purple-500'
        },
        {
            id: 6,
            src: "/images/youtube.png",
            title: 'Youtube',
            style: 'shadow-red-500'
            
        }
        
    ]


    return(
        <div className=" min-h-screen w-full bg-gray-800">
            <div className=" min-h-screen flex flex-col items-center justify-center px-0 md:flex-row">
                <div className="flex flex-col justify-center h-full px-10 md:w-3/5">
                    <h2 className="text-3xl sm:text-6xl font-bold text-yellow-400">
                       Ready To Enter The Vault?
                    </h2>
                    <p className="text-gray-500 py-4 max-w-md text-lg">
                        Welcome to GameVault, the ultimate destination 
                        for games worldwide! Established in 2024, GameVault 
                        is on a mission to make gaming accessible exciting,
                        and convinient for everyone.
                        Our platform is built for players who are passionate
                        about quality games and appreciate a streamlined, easy
                        shopping experience. Whether youre a casual gamer, a
                        hardcore competitor, or a collector, GameVault has 
                        something for you.
                    </p>
                    <div>
                        <button className="text-black w-fit px-6 py-3 my-2
                        flex items-center rounded-md hover:scale-105 duration-500 bg-yellow-400">
                            Shop now
                        </button>
                    </div>
                </div>
                <div className=" md:w-2/5 h-screen flex">
                <Image src= "/images/gameabout.jpg" alt="Game About"  width={1200} height={800}
                 className="rounded-2xl object-cover h-full w-full "/>
                </div>
            </div>

            <div className="min-h-screen w-full">
            <div className=" flex flex-col items-center justify-center min-h-screen px-0 md:flex-row">
            <div className="md:w-2/5 h-screen">
                <Image src= "/images/gameabout.jpg" alt="Game About"  width={1200} height={800}
                 className="rounded-2xl object-cover h-full w-full "/>
                </div>
                <div className="flex flex-col justify-center h-full px-10 md:w-3/5">
                    <h2 className="text-2xl sm:text-6xl font-bold text-yellow-400">
                       Learn More About Us
                    </h2>
                    <p className="text-gray-500 py-4 max-w-md text-lg">
                        Welcome to GameVault, the ultimate destination 
                        for games worldwide! Established in 2024, GameVault 
                        is on a mission to make gaming accessible exciting,
                        and convinient for everyone.
                        Our platform is built for players who are passionate
                        about quality games and appreciate a streamlined, easy
                        shopping experience. Whether youre a casual gamer, a
                        hardcore competitor, or a collector, GameVault has 
                        something for you.
                    </p>
                    <div>
                        <button className="text-black w-fit px-6 py-3 my-2 flex item-center rounded-md hover:scale-105 duration-500 bg-yellow-400">
                            Sign up now
                        </button>
                    </div>
                </div>
            </div>
            </div>

 
            <div className="min-h-screen w-full">
                <div className="max-w-screen-lg mx-auto p-4 flex flex-col items-center justify-center w-full h-full text-white"> 
                    <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline text-yellow-400">
                        Keep Up to Date
                    </p>
                    <p className="py-6 text-lg">
                        Follow our social Media Handles</p>
                

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
                    {
                        techs.map(({id, src, title, style}) =>(
                            <div key={id}
                            className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}>
                        <img src={src} alt="" className="w-20 mx-auto" />
                        <p className="mt-4">{title}</p>
                    </div>
                        ))
                    }
                    
                </div>
            </div>

           </div>


        </div>
    );
};

export default About;
   



