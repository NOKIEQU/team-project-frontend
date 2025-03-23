"use client";
 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Shield, Users, Zap, Gift, Headphones, Globe, Star } from "lucide-react";
 
const About = () => {
  const timeline = [
    {
      year: "Sep 2024",
      title: "The Beginning",
      description: "GameVault began as a concept to create a modern gaming marketplace with a focus on curation and community."
    },
    {
      year: "Nov 2024",
      title: "Development",
      description: "Our team worked tirelessly to build the platform, focusing on user experience and a robust backend system."
    },
    {
      year: "Jan 2025",
      title: "Testing Phase",
      description: "GameVault entered extensive testing, ensuring a seamless experience for our future users."
    },
    {
      year: "Mar 2025",
      title: "Launch",
      description: "GameVault officially launched, offering a carefully selected catalog of games across multiple genres and platforms."
    }
  ];
 
  const stats = [
    { label: "Games Available", value: "250", icon: <Gift size={24} /> },
    { label: "Active Users", value: "800+", icon: <Users size={24} /> },
    { label: "Game Genres", value: "9", icon: <Shield size={24} /> },
    { label: "Countries Served", value: "80+", icon: <Globe size={24} /> }
  ];
 
  const [currentRating, setCurrentRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  
  const generatePlaceholderImage = (width, height) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23252530'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='${Math.min(width, height) / 10}px' fill='%233A3A4A'%3EImage%3C/text%3E%3C/svg%3E`;
  };
 
  return (
    <div className="min-h-screen w-full bg-[#1a1a22] overflow-x-hidden text-white">
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a22] z-10"></div>
        <video
          src="/images/Aboutgame.mp4"
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 className="text-5xl md:text-7xl font-bold text-center text-white drop-shadow-lg">
            About GameVault
          </h1>
          <div className="bg-[#FFA800] h-2 rounded-full w-1/4 lg:w-1/5 mt-2 transition-all hover:w-2/6"></div>          <p className="mt-6 text-lg md:text-xl text-center max-w-2xl px-4">
            Your premier destination for games across all platforms, curated with passion for every type of player.
          </p>
        </div>
      </div>
 
      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-center">Our Story</h2>
            <div className="bg-[#f6a302] h-2 rounded-full w-24 mt-2 transition-all hover:w-1/5"></div>
          </div>
 
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">The GameVault Journey</h3>
              <p className="text-gray-300 mb-6">
                Welcome to GameVault, the ultimate destination for games worldwide! Established in 2024, GameVault is on a mission to make gaming accessible, exciting, and convenient for everyone.
              </p>
              <p className="text-gray-300 mb-6">
                Our platform is built for players who are passionate about quality games and appreciate a streamlined, easy shopping experience. Whether you're a casual gamer, a hardcore competitor, or a collector, GameVault has something for you.
              </p>
              <p className="text-gray-300">
                At GameVault, we pride ourselves on delivering quality games, an effortless shopping experience, and a community for gamers who share the same passion for discovery and adventure. No matter what you play or how you play, GameVault is here to support your journey.
              </p>
            </div>
            <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300">
              <div className="space-y-6">
              {timeline.map((item, index) => (
  <div key={index} className="flex">
    <div className="mr-4 flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-[#f6a302] flex flex-col items-center justify-center font-bold text-white text-center text-sm">
        <span>{item.year.split(' ')[0]}</span>
        <span>{item.year.split(' ')[1]}</span>
      </div>
      {index < timeline.length - 1 && <div className="w-0.5 h-full bg-[#3A3A4A] mt-2"></div>}
    </div>
    <div>
      <h4 className="text-xl font-bold text-white">{item.title}</h4>
      <p className="text-gray-400 mt-1">{item.description}</p>
    </div>
  </div>
))}
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Our Mission Section */}
      <div className="bg-[#252530] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-4xl font-bold text-center">Our Mission</h2>
              <div className="bg-[#f6a302] h-2 rounded-full w-28 mt-2 transition-all hover:w-2/6"></div>
            </div>
 
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-lg overflow-hidden order-2 md:order-1 hover:transform hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a22] to-transparent z-10"></div>
                <div className="w-full h-full">
                  <img
                    src="/images/mission.jpg"
                    alt="Gaming community"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = generatePlaceholderImage(800, 500);
                    }}
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4">Why We Exist</h3>
                <p className="text-gray-300 mb-6">
                  At GameVault, gaming is more than just entertainment—it's a gateway to new worlds. We don't just sell games; we open the door to epic quests, cozy simulations, and mind-bending challenges.
                </p>
                <p className="text-gray-300 mb-6">
                  Our curated collection has something for every gamer, whether you're diving into multiplayer battles, embarking on solo adventures, or adding to your cherished collection.
                </p>
                <p className="text-gray-300">
                  Our vault is packed with adventures for every kind of gamer. Dive in and discover your next obsession!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
 
{/* Stats Section */}
<div className="container mx-auto px-4 py-20">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {stats.map((stat, index) => (
      <div key={index} className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 text-center hover:border-[#f6a302] transition-all duration-300 hover:transform hover:scale-105">
        <div className="flex justify-center mb-4 text-[#f6a302]">
          {stat.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.value}</h3>
        <p className="text-gray-400 mt-2">{stat.label}</p>
      </div>
    ))}
  </div>
</div>
 
      {/* Rating Section (Replaced Testimonials) */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-center">Rate Our Website</h2>
          <div className="bg-[#f6a302] h-2 rounded-full w-44 mt-2 transition-all hover:w-1/5"></div>
        </div>
 
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-8 hover:border-[#f6a302] transition-all duration-300">
            {!hasRated ? (
              <>
                <p className="text-center text-xl mb-8">We'd love to hear your feedback! How would you rate your experience?</p>
                <div className="flex justify-center space-x-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => {
                        setCurrentRating(rating);
                        setHasRated(true);
                      }}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        size={48}
                        fill={(hoveredRating || currentRating) >= rating ? "#f6a302" : "none"}
                        stroke={(hoveredRating || currentRating) >= rating ? "#f6a302" : "#9ca3af"}
                        strokeWidth={2}
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      size={36}
                      fill={currentRating >= rating ? "#f6a302" : "none"}
                      stroke={currentRating >= rating ? "#f6a302" : "#9ca3af"}
                    />
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank you for your feedback!</h3>
                <p className="text-gray-300 text-lg">Your rating helps us improve GameVault for everyone.</p>
              </div>
            )}
          </div>
        </div>
      </div>
 
      {/* Values Section */}
      <div className="bg-[#252530] py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-center">Our Values</h2>
            <div className="bg-[#f6a302] h-2 rounded-full w-24 mt-2 transition-all hover:w-1/6"></div>
          </div>
 
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a22] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#f6a302] rounded-full flex items-center justify-center mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Curation</h3>
              <p className="text-gray-400">We carefully select every game in our catalog to ensure only the best experiences make it to our customers.</p>
            </div>
           
            <div className="bg-[#1a1a22] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#f6a302] rounded-full flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-gray-400">We build everything with our gaming community in mind, creating spaces for connection and shared experiences.</p>
            </div>
           
            <div className="bg-[#1a1a22] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#f6a302] rounded-full flex items-center justify-center mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-400">We constantly evolve our platform with new features and technologies to provide the best shopping experience possible.</p>
            </div>
          </div>
        </div>
      </div>
 
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="bg-[#f6a302] h-2 rounded-full w-52 mt-2 transition-all hover:w-2/5"></div>
        </div>
 
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300">
              <h3 className="text-xl font-bold mb-3">How does digital game delivery work?</h3>
              <p className="text-gray-400">After purchase, you'll receive your game key instantly via email and in your account dashboard. Simply redeem the key on the corresponding platform (Steam, Epic, etc.) to add the game to your library.</p>
            </div>
           
            <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300">
              <h3 className="text-xl font-bold mb-3">Are the games region-locked?</h3>
              <p className="text-gray-400">We clearly mark region restrictions on each game's page. Most of our games are available worldwide, but some titles may have regional activation restrictions due to publisher requirements.</p>
            </div>
           
            <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 hover:border-[#f6a302] transition-all duration-300">
              <h3 className="text-xl font-bold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, PayPal, and gift cards. All payments are processed securely through our trusted payment providers.</p>
            </div>
          </div>
        </div>
      </div>
 
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-[#252530] to-[#1a1a22] border border-[#3A3A4A] rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Gaming Community?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the GameVault difference today. Browse our carefully curated selection of games and join thousands of satisfied gamers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register">
              <button className="text-black w-fit px-8 py-4 flex items-center rounded-md hover:scale-105 duration-500 bg-[#F0ECEC] hover:bg-[#f6a302] font-bold">
                Sign up now
              </button>
            </Link>
            <Link href="/shop">
              <button className="text-black w-fit px-8 py-4 flex items-center rounded-md hover:scale-105 duration-500 bg-[#F0ECEC] hover:bg-[#f6a302] font-bold">
                Shop now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default About;