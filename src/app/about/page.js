import React from "react";
import Link from "next/link";

const About = () => {
  const techs = [
    {
      id: 1,
      src: "/images/instagram.jpg",
      title: "Instagram",
      style: "shadow-pink-500",
      link: "https://instagram.com"
    },
    {
      id: 2,
      src: "/images/twitter.jpg",
      title: "Twitter",
      style: "shadow-green-500",
      link: "https://twitter.com"
    },
    {
      id: 3,
      src: "/images/link.png",
      title: "LinkedIn",
      style: "shadow-orange-500",
      link: "https://linkedin.com"
    },
    {
      id: 4,
      src: "/images/facebook.jpg",
      title: "Facebook",
      style: "shadow-blue-500",
      link: "https://facebook.com"
    },
    {
      id: 5,
      src: "/images/tiktok.png",
      title: "TikTok",
      style: "shadow-purple-500",
      link: "https://tiktok.com"
    },
    {
      id: 6,
      src: "/images/youtube.png",
      title: "YouTube",
      style: "shadow-red-500",
      link: "https://youtube.com"
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#1a1a22] overflow-x-hidden">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative bg-gradient-to-b from-[#1a1a22] via-[#1a1a22]/95 to-[#1a1a22]">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-10"></div>
        <div className="max-w-[1400px] mx-auto px-8 py-32 relative">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-tight">
                Redefining Your
                <span className="text-[#f6a302] block mt-2">Gaming Experience</span>
              </h1>
              <div className="h-1 w-32 bg-[#f6a302] mb-10"></div>
              <p className="text-gray-300 text-xl leading-relaxed mb-12 max-w-xl">
                Welcome to GameVault, where passion meets play. Established in 2024, 
                we're on a mission to make gaming accessible, exciting, and convenient 
                for everyone who shares our love for digital adventures.
              </p>
              <Link href="/shop">
                <button className="bg-[#F0ECEC] text-[#1A1A22] px-10 py-5 rounded-xl font-semibold 
                  transition-all duration-300 hover:bg-[#F0ECEC]/90 hover:scale-105 
                  shadow-lg hover:shadow-2xl hover:shadow-black/30 text-lg">
                  Explore Our Collection
                </button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#f6a302]/20 rounded-xl blur-xl"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <video
                    src="/images/about2ndvid.mp4"
                    className="w-full aspect-[16/9]"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#1a1a22] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-20">
            <div className="w-full md:w-1/2 space-y-8">
              <div className="inline-block">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Who We Are</h2>
                <div className="h-1 w-24 bg-[#f6a302] transition-all duration-300 hover:w-32"></div>
              </div>
              <p className="text-gray-300 text-xl leading-relaxed">
                Our platform is crafted for players who are passionate about quality gaming 
                experiences. Whether you're a casual gamer, a hardcore competitor, or a 
                collector, GameVault is your trusted destination.
              </p>
              <ul className="space-y-6 text-gray-300 text-lg">
                <li className="flex items-center gap-4">
                  <div className="h-3 w-3 bg-[#f6a302] rounded-full"></div>
                  <span>Curated Selection of Premium Games</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-3 w-3 bg-[#f6a302] rounded-full"></div>
                  <span>Secure and Seamless Shopping Experience</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-3 w-3 bg-[#f6a302] rounded-full"></div>
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <video
                  src="/images/Aboutgame.mp4"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Section */}
      <div className="bg-[#1a1a22]/50 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Commitment</h2>
            <div className="h-1 w-24 bg-[#f6a302] mx-auto mb-10 transition-all duration-300 hover:w-48"></div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              At GameVault, gaming is more than entertainment—it's a gateway to new worlds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {[
              {
                title: "Quality Assurance",
                description: "Every game in our collection is thoroughly vetted for quality and authenticity."
              },
              {
                title: "Secure Shopping",
                description: "Your security is our priority, with state-of-the-art protection for all transactions."
              },
              {
                title: "Community First",
                description: "We're building more than a store - we're creating a community of passionate gamers."
              }
            ].map((card, index) => (
              <div key={index} className="bg-[#F0ECEC] p-10 rounded-xl 
                transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/30
                transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-[#1A1A22] mb-6">{card.title}</h3>
                <p className="text-[#1A1A22]/80 text-lg">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/register">
              <button className="bg-[#F0ECEC] text-[#1A1A22] px-10 py-5 rounded-xl font-semibold 
                transition-all duration-300 hover:bg-[#F0ECEC]/90 hover:scale-105 
                shadow-lg hover:shadow-2xl hover:shadow-black/30 text-lg">
                Join GameVault
              </button>
            </Link>
            <Link href="/shop">
              <button className="bg-[#F0ECEC] text-[#1A1A22] px-10 py-5 rounded-xl font-semibold 
                transition-all duration-300 hover:bg-[#F0ECEC]/90 hover:scale-105 
                shadow-lg hover:shadow-2xl hover:shadow-black/30 text-lg">
                Browse Games
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-[#1a1a22] py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Connect With Us</h2>
            <div className="h-1 w-24 bg-[#f6a302] mx-auto mb-10 transition-all duration-300 hover:w-48"></div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Join our growing community across social media for the latest updates, 
              exclusive offers, and gaming content.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {techs.map(({ id, src, title, style, link }) => (
              <a 
                href={link}
                key={id}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F0ECEC] p-8 rounded-xl 
                  transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/30
                  transform hover:-translate-y-1"
              >
                <img src={src} alt="" className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-[#1A1A22] text-sm text-center group-hover:text-[#1A1A22]/80 transition-colors duration-300">
                  {title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
