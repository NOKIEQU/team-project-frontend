'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/cart-context'; // Ensure this path is correct

export default function Home() {
  const [genres, setGenres] = useState([]);
  const { addToCart, cart, updateQuantity } = useCart();
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://51.77.110.253:3001/api/genres');
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const featuredGames = [
    {
      id: 1,
      image: '/GameCards/mortalcombat.jpeg',
      title: 'Mortal Combat',
      price: 50,
      rating: 4.5,
      description: "Fighting action game"
    },
    {
      id: 2,
      image: '/GameCards/assasins.jpg',
      title: 'Assassins Creed',
      price: 45,
      rating: 4.2,
      description: "Open-world adventure"
    },
    {
      id: 3,
      image: '/GameCards/EldenRing.jpg',
      title: 'Elden Ring',
      price: 60,
      rating: 4.8,
      description: "Fantasy RPG"
    },
    {
      id: 4,
      image: '/GameCards/halo.jpg',
      title: 'Halo',
      price: 30,
      rating: 4.0,
      description: "Sci-fi shooter"
    },
    {
      id: 5,
      image: '/GameCards/lastofus.webp',
      title: 'Last of Us',
      price: 50,
      rating: 4.9,
      description: "Action adventure"
    },
    {
      id: 6,
      image: '/GameCards/returnal.jpg',
      title: 'Returnal',
      price: 40,
      rating: 4.3,
      description: "Roguelike shooter"
    },
  ];

  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      quantity: 1,
      img: game.image
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1A22] text-white font-oswald">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A22] via-black/60 to-transparent">
          <div className="flex flex-col w-full h-full px-6 lg:px-12 lg:pt-20 gap-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-centre">
              We are on <span className="text-[#FFA800]">TOP</span> of our game
            </h1>
            <div className="bg-[#FFA800] h-2 rounded-full w-1/4 lg:w-1/5 mt-2 transition-all hover:w-3/4"></div>

            <p className="text-lg lg:text-xl leading-relaxed">
              <span className="font-bold text-xl lg:text-2xl">
                Start Your Journey{' '}
              </span>
              in the world of gaming. Whether you&apos;re a seasoned player or
              just starting, we have everything you need to explore and grow.
              The adventure starts now!
            </p>

            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              <Link href="/shop">
                <button className="bg-[#FFA800] text-white font-bold py-3 px-6 rounded-full hover:bg-[#e08800] transition transform hover:scale-105 shadow-md">
                  SHOP NOW
                </button>
              </Link>
              <Link href="/Questionnaire">
                <button className="bg-[#252530] border border-[#3A3A4A] text-white font-bold py-3 px-6 rounded-full hover:bg-[#3A3A4A] transition transform hover:scale-105 shadow-md">
                  FIND YOUR GAME
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <img
                src="league1.webp"
                className="w-full rounded-lg transition-transform hover:scale-105 shadow-lg"
                alt="League of Legends"
              />
              <img
                src="callofduty.jpg"
                className="w-full rounded-lg transition-transform hover:scale-105 shadow-lg"
                alt="Call of Duty"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full bg-[#151519] py-16 px-8 lg:px-20 shadow-xl">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="fantasy.webp"
            className="w-3/4 rounded-lg transition-transform hover:scale-105 shadow-lg"
            alt="Fantasy"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-10 lg:mt-16 lg:pl-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold">WHY WE ARE THE BEST</h1>
          <div className="bg-[#FFA800] h-2 rounded-full w-1/5 mt-3 mb-6 transition-all hover:w-3/5"></div>
          <p className="text-lg leading-relaxed">
            Explore why we are at the top. From curated collections to expert
            reviews, we bring you the best in gaming.
          </p>
          <Link href="/about">
            <button className="inline-block mt-6 bg-[#FFA800] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#e08800] transition duration-300 hover:scale-105 transform">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full min-h-screen py-16 px-4 lg:px-16 items-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Our <span className="text-[#FFA800]">TOP</span> Games
        </h1>
        <div className="bg-[#FFA800] h-2 rounded-full w-1/3 lg:w-1/6 transition-all hover:w-2/6 mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl">
          {featuredGames.map((game) => {
            const cartItem = cart?.find(item => item.id === game.id);
            
            return (
              <div
                key={game.id}
                className="bg-[#252530] rounded-lg border border-[#3A3A4A] transform transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md overflow-hidden"
              >
                <Link href={`/shop/${game.id}`}>
                  <div className="p-4">
                    <div className="h-48 overflow-hidden rounded-md mb-4">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{game.description}</p>

                    <div className="text-yellow-400 flex items-center mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-sm">{i < Math.floor(game.rating) ? "★" : "☆"}</span>
                      ))}
                      <span className="text-sm ml-2 text-gray-300">({game.rating})</span>
                    </div>
                  </div>
                </Link>
                <div className="p-4 mt-1 flex justify-between items-center border-t border-[#3A3A4A] pt-3">
                  <span className="text-lg font-bold text-white whitespace-nowrap">
                    £{game.price.toFixed(2)}
                  </span>
                  
                  {cartItem ? (
                    <div className="flex items-center bg-[#3A3A4A] rounded-full px-3 py-1">
                      <button
                        className="bg-[#252530] hover:bg-[#1A1A22] p-2 rounded-full text-white"
                        onClick={() => updateQuantity(game.id, cartItem.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-3 text-white">{cartItem.quantity}</span>
                      <button
                        className="bg-[#252530] hover:bg-[#1A1A22] p-2 rounded-full text-white"
                        onClick={() => updateQuantity(game.id, cartItem.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-[#FFA800] hover:bg-[#e08800] px-5 py-2 text-white rounded-full font-bold transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => handleAddToCart(game)}
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingCart size={16} />
                        Add
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col w-full pt-12 pb-32 items-center bg-[#151519]">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Explore Game Genres</h1>
        <div className="bg-[#FFA800] h-2 rounded-full w-1/3 lg:w-1/6 transition-all hover:w-2/6 mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-screen-xl">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/shop?genre=${encodeURIComponent(genre.name)}`}
            >
              <button className="bg-[#252530] border border-[#3A3A4A] text-white font-bold py-6 px-8 rounded-lg hover:bg-[#3A3A4A] transition transform hover:scale-105 w-full shadow-md hover:shadow-lg">
                {genre.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}