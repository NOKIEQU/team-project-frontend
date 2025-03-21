"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Instagram, Twitter, Linkedin, Facebook, MessageCircle, Youtube, Shield, Users, Zap, Gift, Headphones, Globe } from "lucide-react";

const About = () => {
  // Social media links
  const socialLinks = [
    {
      id: 1,
      icon: <Instagram size={48} />,
      title: "Instagram",
      link: "https://instagram.com"
    },
    {
      id: 2,
      icon: <Twitter size={48} />,
      title: "Twitter",
      link: "https://twitter.com"
    },
    {
      id: 3,
      icon: <Linkedin size={48} />,
      title: "LinkedIn",
      link: "https://linkedin.com"
    },
    {
      id: 4,
      icon: <Facebook size={48} />,
      title: "Facebook",
      link: "https://facebook.com"
    },
    {
      id: 5,
      icon: <MessageCircle size={48} />,
      title: "TikTok",
      link: "https://tiktok.com"
    },
    {
      id: 6,
      icon: <Youtube size={48} />,
      title: "YouTube",
      link: "https://youtube.com"
    },
  ];

  // Timeline data
  const timeline = [
    {
      year: "2022",
      title: "The Idea",
      description: "GameVault began as a concept to create a modern gaming marketplace with a focus on curation and community."
    },
    {
      year: "2023",
      title: "Development",
      description: "Our team worked tirelessly to build the platform, focusing on user experience and a robust backend system."
    },
    {
      year: "2024",
      title: "Launch",
      description: "GameVault officially launched, offering a carefully selected catalog of games across multiple genres and platforms."
    },
    {
      year: "2025",
      title: "Growth",
      description: "With a growing community and expanding game library, GameVault continues to evolve with new features and partnerships."
    }
  ];

  const stats = [
    { label: "Games Available", value: "2,500+", icon: <Gift size={24} /> },
    { label: "Active Users", value: "75,000+", icon: <Users size={24} /> },
    { label: "Game Genres", value: "35+", icon: <Shield size={24} /> },
    { label: "Countries Served", value: "120+", icon: <Globe size={24} /> }
  ];

  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      role: "Casual Gamer",
      quote: "GameVault has completely changed how I discover new games. The curation is spot-on and I've found so many hidden gems I would've missed otherwise.",
      image: "/images/testimonials/james.jpg"
    },
    {
      id: 2,
      name: "Elena Kim",
      role: "Competitive Player",
      quote: "As someone who takes gaming seriously, I appreciate the detailed information GameVault provides about each title. Their service is reliable and fast.",
      image: "/images/testimonials/elena.jpg"
    },
    {
      id: 3,
      name: "Marcus Thompson",
      role: "Game Collector",
      quote: "The collector editions and special releases section on GameVault is unmatched. I've completed collections I've been working on for years.",
      image: "/images/testimonials/marcus.jpg"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

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
          <div className="bg-[#f6a302] h-2 rounded-full w-40 md:w-64 mt-4 transition-all duration-500 hover:w-56 md:hover:w-80"></div>
          <p className="mt-6 text-lg md:text-xl text-center max-w-2xl px-4">
            Your premier destination for games across all platforms, curated with passion for every type of player.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-center">Our Story</h2>
            <div className="bg-[#f6a302] h-2 rounded-full w-24 mt-2"></div>
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
                      <div className="w-10 h-10 rounded-full bg-[#f6a302] flex items-center justify-center font-bold">{item.year}</div>
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
              <div className="bg-[#f6a302] h-2 rounded-full w-24 mt-2"></div>
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
              <h3 className="text-3xl md:text-4xl font-bold text-[#f6a302]">{stat.value}</h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-center">What Gamers Say</h2>
          <div className="bg-[#f6a302] h-2 rounded-full w-32 mt-2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full">
                  <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-8 hover:border-[#f6a302] transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-2 border-[#f6a302]">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = generatePlaceholderImage(100, 100);
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-[#f6a302]">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full z-10 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full z-10 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === currentTestimonial ? 'bg-[#f6a302]' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#252530] py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold text-center">Our Values</h2>
            <div className="bg-[#f6a302] h-2 rounded-full w-24 mt-2"></div>
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
          <div className="bg-[#f6a302] h-2 rounded-full w-32 mt-2"></div>
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

      {/* Social Media Section */}
      <div className="w-full bg-[#1a1a22] pt-24 pb-20">
        <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
          <div className="h-auto flex flex-col items-center">
            <p className="text-4xl font-bold text-white">
              Keep Up to Date
            </p>
            <div className="bg-[#f6a302] h-2 rounded-full w-2/6 mt-2 transition-all hover:w-4/6"></div>
          </div>
          <p className="py-6 text-lg text-center">
            Stay connected and informed by following us on social media for the latest news,
            offers, and gaming updates.
          </p>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
            {socialLinks.map(({ id, icon, title, link }) => (
              <a 
                href={link}
                key={id}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#252530] border border-[#3A3A4A] rounded-lg py-6 hover:scale-105 duration-500 hover:border-[#f6a302] transition-all"
              >
                <div className="flex justify-center text-[#f6a302]">
                  {icon}
                </div>
                <p className="mt-4 text-white">{title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;