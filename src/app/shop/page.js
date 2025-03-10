"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../../context/cart-context";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";

function ShopPage() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre");
  const [selectedGenres, setSelectedGenres] = useState(
    initialGenre ? [initialGenre] : []
  );
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [selectedYears, setSelectedYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { cart, addToCart, updateQuantity } = useCart();

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, productsResponse] = await Promise.all([
          fetch("http://51.77.110.253:3001/api/genres"),
          fetch("http://51.77.110.253:3001/api/products"),
        ]);

        if (!genresResponse.ok || !productsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const genresData = await genresResponse.json();
        const productsData = await productsResponse.json();

        setGenres(genresData);
        setGames(productsData);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredGames = games.filter(
    (game) =>
      (selectedGenres.length === 0 ||
        selectedGenres.includes(game.genre.name)) &&
      parseFloat(game.price) >= minPriceRange &&
      parseFloat(game.price) <= maxPriceRange &&
      parseInt(game.rating) >= minRating &&
      (selectedYears.length === 0 ||
        selectedYears.includes(game.releaseYear)) &&
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: parseFloat(game.price),
      quantity: 1,
    });
  };

  const handlePriceChange = (setter, value) => {
    const numericValue = Math.min(200, Math.max(0, parseFloat(value) || 0));
    setter(numericValue);

    if (setter === setMinPriceRange && numericValue > maxPriceRange) {
      setMaxPriceRange(numericValue);
    }
    if (setter === setMaxPriceRange && numericValue < minPriceRange) {
      setMinPriceRange(numericValue);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedGenres([]);
    setMinPriceRange(0);
    setMaxPriceRange(200);
    setMinRating(0);
    setSelectedYears([]);
    setSearchQuery("");
  };

  if (loading)
    return (
      <div className="min-h-screen w-full bg-[#0d1b2a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen w-full bg-[#0d1b2a] text-red-500 flex items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-[#0d1b2a] text-white font-sans">
   
      <div className="flex flex-row w-full gap-x-6 px-6 lg:px-24 py-10">
        {/* Sidebar */}
        <aside className="hidden lg:block bg-[#1b263b] p-6 rounded-lg w-1/4">
          <h2 className="text-2xl font-bold text-[#f6a302] mb-6">Filters</h2>
          {/* Genres */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Genres</h3>
            {genres.map((genre) => (
              <div key={genre.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={genre.id}
                  checked={selectedGenres.includes(genre.name)}
                  onChange={() => handleGenreChange(genre.name)}
                  className="mr-3 cursor-pointer"
                />
                <label htmlFor={genre.id} className="cursor-pointer">
                  {genre.name}
                </label>
              </div>
            ))}
            {/* Reset Filters Label */}
            <input
              type="checkbox"
              id="reset-filters"
              className="cursor-pointer text-white mt-4 inline-block"
              onChange={(e) => {
                if (e.target.checked) {
                  resetFilters();
                }
              }}
            />
            <label
              htmlFor="reset-filters"
              className="cursor-pointer text-white ml-2"
            >
              Reset Filters
            </label>
          </div>
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <input
              type="number"
              value={minPriceRange}
              onChange={(e) =>
                handlePriceChange(setMinPriceRange, e.target.value)
              }
              className="w-full p-2 mb-2 rounded-lg bg-[#2e3a4e] border border-[#444] focus:border-[#f6a302] text-white placeholder-gray-400"
              placeholder="Min Price"
            />
            <input
              type="number"
              value={maxPriceRange}
              onChange={(e) =>
                handlePriceChange(setMaxPriceRange, e.target.value)
              }
              className="w-full p-2 rounded-lg bg-[#2e3a4e] border border-[#444] focus:border-[#f6a302] text-white placeholder-gray-400"
              placeholder="Max Price"
            />
          </div>
          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Minimum Rating</h3>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full"
            />
            <p className="text-sm mt-2">{minRating} / 5</p>
          </div>
          {/* Release Year */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Release Year</h3>
            {Array.from(new Set(games.map((game) => game.releaseYear)))
              .sort()
              .map((year) => (
                <div key={year} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`year-${year}`}
                    checked={selectedYears.includes(year)}
                    onChange={() =>
                      setSelectedYears((prev) =>
                        prev.includes(year)
                          ? prev.filter((y) => y !== year)
                          : [...prev, year]
                      )
                    }
                    className="mr-3 cursor-pointer"
                  />
                  <label htmlFor={`year-${year}`} className="cursor-pointer">
                    {year}
                  </label>
                </div>
              ))}
          </div>
        </aside>
        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1b263b] border border-[#444] text-white focus:border-[#f6a302] focus:ring-0 placeholder-gray-400"
              placeholder="Search games..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGames.map((game) => {
              const cartItem = cart.find((item) => item.id === game.id);
              return (
                <div
                  key={game.id}
                  className="bg-[#1b263b] p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                >
                  <Link href={`/shop/${game.id}`}>
                    <img
                      src={game.imageUrls[0] || "/placeholder.svg"}
                      alt={game.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold">{game.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {game.genre.name}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      {game.releaseYear}
                    </p>
                    <div className="text-yellow-500 flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(game.rating) ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="text-sm ml-2">({game.rating})</span>
                    </div>
                  </Link>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#f6a302]">
                      ${parseFloat(game.price).toFixed(2)}
                    </span>
                    {cartItem ? (
                      <div className="flex items-center">
                        <button
                          className="bg-[#f6a302] p-2 rounded-lg text-black"
                          onClick={() =>
                            updateQuantity(game.id, cartItem.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3">{cartItem.quantity}</span>
                        <button
                          className="bg-[#f6a302] p-2 rounded-lg text-black"
                          onClick={() =>
                            updateQuantity(game.id, cartItem.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-[#f6a302] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#fa9a00]"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                className="bg-[#f6a302] text-black px-4 py-2 rounded-lg"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-[#f6a302] text-black px-4 py-2 rounded-lg"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShopPage;
