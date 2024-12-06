import Image from "next/image";
import Link from "next/link";
import GameCard from "./components/gameCard"

export default function Home() {
  return (

    <div className=" min-h-screen bg-[#0d1b2a] text-white font-oswald">
      <div className="absolute top-5 right-5"></div>


      {/* The first part of the page */}
      <div className="relative shadow-xl">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="league_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gray-800 opacity-90 ">
          <div className="flex flex-col w-full h-screen p-40 pt-60 justify-start gap-y-10">
            <h1 className="text-5xl font-bold text-left">
              We are on <span className="text-[#f6a302]">TOP</span> of our game{" "}
              <br />
              <div className="bg-[#FFA800] h-2 rounded-full w-1/6 transition-all hover:w-5/6"></div>
            </h1>

            <p className="text-lg">
              <span className="text-2xl font-bold">Start Your Journey </span>
              in the world of gaming. Whether you're a seasoned player or just
              starting your journey, we have everything you need to explore,
              learn, and grow. Dive into our curated collections, find new
              favorites, and connect with others who share your passion. The
              possibilities are endless, and the adventure starts right here!
            </p>

            <div className="flex w-full justify-left gap-x-6 -ml-4">
              <Link href="/shop">
                <button className="m-4 bg-[#f6a302] hover:bg-[#e09200d8] font-bold py-4 px-4 rounded-xl w-40 transition transform hover:scale-110">
                  SEARCH NOW
                </button>
              </Link>
              <Link href="/Questionnaire">
                <button className="m-4 bg-[#FFA800] hover:bg-orange-500 font-bold py-3 px-5 rounded-xl w-40 transition transform hover:scale-110">
                  TAKE QUIZ
                </button>
              </Link>
            </div>

            <div className="flex w-full items-center justify-left gap-x-6 mt-15">
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

      <div className="flex w-full h-full shadow-xl ">
        <div className="flex flex-col justify-end w-1/2 ">
          <img
            src="fantasy.webp"
            className="w-3/6 rounded-lg transition-transform hover:scale-110 mt-40 ml-20"
            alt="Fantasy"
          />
          <img
            src="minecraft.avif"
            className="w-2/6 rounded-lg transition-transform hover:scale-110 mt-24 ml-80 mb-10"
            alt="Minecraft"
          />

          {/*Shadow boxes behind images  */}
          <div className="w-3/6 bg-white">

          </div>
        </div>

        <div className="flex flex-col justify-items-start w-1/2 text-left pt-40 m-36  ">
          <h1 className="text-4xl font-bold text-left">WHY WE ARE THE BEST</h1>
          <br />
          <div className="bg-[#FFA800] h-2 rounded-full w-2/6 transition-all hover:w-5/6"></div>
          <p className="pt-10">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet,
            magna non tempus gravida, sapien mi facilisis erat, ac maximus augue
            felis nec ante. Sed ultricies, ipsum sit amet cursus facilisis,
            lectus lectus malesuada tortor, vel pharetra neque purus non est.
            Vivamus lobortis tincidunt lorem, a fermentum tortor condimentum ac.
            Aliquam erat volutpat. Nam convallis urna id nunc tincidunt, non
            euismod lorem ultricies.
          </p>
          <p className="pt-10">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet,
            magna non tempus gravida, sapien mi facilisis erat, ac maximus augue
            felis nec ante. Sed ultricies, ipsum sit amet cursus facilisis,
            lectus lectus malesuada tortor, vel pharetra neque purus non est.
            Vivamus lobortis tincidunt lorem, a fermentum tortor condimentum ac.
            Aliquam erat volutpat. Nam convallis urna id nunc tincidunt, non
            euismod lorem ultricies.
          </p>
          <p className="pt-10">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet,
            magna non tempus gravida, sapien mi facilisis erat, ac maximus augue
            felis nec ante. Sed ultricies, ipsum sit amet cursus facilisis,
            lectus lectus malesuada tortor, vel pharetra neque purus non est.
            Vivamus lobortis tincidunt lorem, a fermentum tortor condimentum ac.
            Aliquam erat volutpat. Nam convallis urna id nunc tincidunt, non
            euismod lorem ultricies.
          </p>
        </div>
      </div>

      {/* Third part of the page */}

      <div className="flex flex-col w-full min-h-screen pt-36 items-center ">
        <h1 className="text-6xl font-bold">
          Our <span className="text-orange-500">TOP</span> games
        </h1>
        <br />

        <div className="bg-[#FFA800] h-2 rounded-full w-1/6 transition-all hover:w-2/6"></div>

        <div className="flex flex-wrap justify-center gap-8 mt-10 w-3/4 pt-20 pb-32 font-bold">
          <GameCard
            image="/GameCards/mortalcombat.jpeg"
            title="Mortal Combat"
            price="£50"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/assasins.jpg"
            title="Assasins Creed"
            price="£45"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/EldenRing.jpg"
            title="Elden Ring"
            price="£60"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/halo.jpg"
            title="Halo"
            price="£30"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/lastofus.webp"
            title="Last of Us"
            price="£50"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/returnal.jpg"
            title="Returnal"
            price="£40"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/detroit.jpg"
            title="Detroit becomes human"
            price="£35"
            description="An open-world adventure"
          />
          <GameCard
            image="/GameCards/overwatch.jpg"
            title="Overwatch 2"
            price="£20"
            description="An open-world adventure"
          />
        </div>
      </div>
    </div>
  );
}
