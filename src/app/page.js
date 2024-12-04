import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";
import GameCard from "./components/gameCard";

export default function Home() {
  return (
    <div className=" bg-gray-800 text-white h-100% w-100%  min-h-screen ">
      <Navbar isLoggedIn={"true"} />

      {/* The first part of the page */}
      <div className="relative shadow-xl">
        <img
          src="league.jpeg"
          className="h-full w-full object-cover "
          alt="League Image"
        />


        <div className="absolute top-0 right-0 h-full w-1/2 bg-gray-800 opacity-100%">
          <div className="flex flex-col w-full h-screen  p-40 pt-60 justify-left gap-y-10">
            <h1 className="text-5xl font-bold text-left">
              We are on <span className="text-orange-500">TOP</span> of our game
            </h1>

            <p className="text-lg">
              <span className="text-2xl font-bold ">Start Your Journey </span>{" "}
              in the world of gaming. Whether you're a seasoned player or just
              starting your journey, we have everything you need to explore,
              learn, and grow. Dive into our curated collections, find new
              favorites, and connect with others who share your passion. The
              possibilities are endless, and the adventure starts right here!
            </p>

            <div className="flex w-full justify-left gap-x-6 -ml-4">
              <Link href={"/shop"}>
                {" "}
                <button className="m-4 bg-[#FFA800] hover:bg-orange-500 font-bold py-4 px-4 rounded-xl w-40 transition transform hover:scale-110">
                  SEARCH NOW
                </button>{" "}
              </Link>
              <Link href={"/Questionnaire"}>
              <button className="m-4 bg-[#FFA800] hover:bg-orange-500 font-bold py-3 px-5 rounded-xl w-40 transition transform hover:scale-110">
                TAKE QUIZ

              </button>
              </Link>
            </div>

            <div className="flex w-full items-center justify-left gap-x-6 mt-15 ">
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


      {/* The second  part of the page */}

      <div className="flex w-full h-full shadow-xl">


  <div className="flex flex-col justify-end w-1/2 ">
    <img
      src="fantasy.webp"
      className="w-3/6 rounded-lg transition-transform hover:scale-110 mt-48 ml-20"
      alt="Fantasy"
    />
    <img
      src="minecraft.avif"
      className="w-2/6 rounded-lg transition-transform hover:scale-110 mt-24 ml-80"
      alt="Minecraft"
    />
  </div>


  <div className="flex flex-col justify-items-start w-1/2 text-left pt-96">
    <h1 className="text-4xl font-bold text-left">Why we are the best</h1>
    <p className="pt-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, magna non tempus gravida, sapien mi facilisis erat, ac maximus augue felis nec ante. Sed ultricies, ipsum sit amet cursus facilisis, lectus lectus malesuada tortor, vel pharetra neque purus non est. Vivamus lobortis tincidunt lorem, a fermentum tortor condimentum ac. Aliquam erat volutpat. Nam convallis urna id nunc tincidunt, non euismod lorem ultricies.</p>
    <p className="pt-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, magna non tempus gravida, sapien mi facilisis erat, ac maximus augue felis nec ante. Sed ultricies, ipsum sit amet cursus facilisis, lectus lectus malesuada tortor, vel pharetra neque purus non est. Vivamus lobortis tincidunt lorem, a fermentum tortor condimentum ac. Aliquam erat volutpat. Nam convallis urna id nunc tincidunt, non euismod lorem ultricies.</p>
    <p className="pt-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, magna non tempus gravida, sapien mi facilisis erat, ac maximus augue felis nec ante. Sed ultricies, ipsum sit amet cursus facilisis, lectus lectus malesuada tortor, vel pharetra neque purus non est. Vivamus lobortis tincidunt lorem, a fermentum tortor condimentum ac. Aliquam erat volutpat. Nam convallis urna id nunc tincidunt, non euismod lorem ultricies.</p>
  </div>
</div>

  {/* Third part of the page */}

  <div className="flex flex-col flex-grow w-full h-full pt-36 items-center  mb-20">
  <h1 className="text-6xl font-bold">Our <span className="text-orange-500">TOP</span> games</h1>
  
  <div className="flex flex-wrap justify-center gap-6 mt-10 w-3/4 pt-20">
    <GameCard image="/GameCards/mortalcombat.jpeg" title="Mortal Combat" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/assasins.jpg" title="Assasins Creed" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/EldenRing.jpg" title="Elden Ring" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/halo.jpg" title="" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/lastofus.webp" title="Last of Us" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/returnal.jpg" title="Returnal" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/detroit.jpg" title="Detroit becomes human" price="£15" description="An open-world adventure" />
    <GameCard image="/GameCards/genshin.avif" title="Genshin" price="£15" description="An open-world adventure" />
   
   
  </div>
  

</div>


    </div>
  );
}
