"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/cart-context";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";

function ShopPage() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredGames, setFeaturedGames] = useState([]);
  const [budgetGames, setBudgetGames] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [currentBudgetCarouselIndex, setCurrentBudgetCarouselIndex] = useState(0);
  const [currentRecentCarouselIndex, setCurrentRecentCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const budgetCarouselRef = useRef(null);
  const recentCarouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isBudgetPaused, setIsBudgetPaused] = useState(false);
  const [isRecentPaused, setIsRecentPaused] = useState(false);

  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre");
  const [selectedGenres, setSelectedGenres] = useState(initialGenre ? [initialGenre] : []);
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [selectedYears, setSelectedYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { cart, addToCart, updateQuantity } = useCart();

  const itemsPerPage = 6;

  const getItemWidth = () => {
    return window.innerWidth < 640 ? window.innerWidth - 40 : 384;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        const totalItems = featuredGames.length;
        const nextIndex = (currentCarouselIndex + 1) % totalItems;
        setCurrentCarouselIndex(nextIndex);
        const scrollAmount = nextIndex * getItemWidth();
        carouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentCarouselIndex, isPaused, featuredGames.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBudgetPaused && budgetCarouselRef.current) {
        const totalItems = budgetGames.length;
        const nextIndex = (currentBudgetCarouselIndex + 1) % totalItems;
        setCurrentBudgetCarouselIndex(nextIndex);
        const scrollAmount = nextIndex * getItemWidth();
        budgetCarouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentBudgetCarouselIndex, isBudgetPaused, budgetGames.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRecentPaused && recentCarouselRef.current && recentlyViewed.length > 0) {
        const totalItems = recentlyViewed.length;
        const nextIndex = (currentRecentCarouselIndex + 1) % totalItems;
        setCurrentRecentCarouselIndex(nextIndex);
        const scrollAmount = nextIndex * getItemWidth();
        recentCarouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentRecentCarouselIndex, isRecentPaused, recentlyViewed.length]);

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

        console.log("Fetched products:", productsData);

        setGenres(genresData);
        setGames(productsData);
        
        const sortedGames = [...productsData].sort((a, b) => b.rating - a.rating);
        setFeaturedGames(sortedGames.slice(0, 8));
        
        const budgetGamesList = productsData.filter(game => parseFloat(game.price) < 20);
        setBudgetGames(budgetGamesList.slice(0, 8));
        
        const storedRecent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        console.log("Stored recently viewed IDs:", storedRecent);
        const recentGames = storedRecent.map(id => productsData.find(game => game.id === id)).filter(Boolean);
        setRecentlyViewed(recentGames);
        console.log("Initial recently viewed games:", recentGames);
        
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data");
        setLoading(false);
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (recentlyViewed.length > 0) {
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed.map(game => game.id)));
      console.log("Updated recentlyViewed:", recentlyViewed);
    }
  }, [recentlyViewed]);

  const filteredGames = games.filter(
    (game) =>
      (selectedGenres.length === 0 || selectedGenres.includes(game.genre.name)) &&
      parseFloat(game.price) >= minPriceRange &&
      parseFloat(game.price) <= maxPriceRange &&
      parseInt(game.rating) >= minRating &&
      (selectedYears.length === 0 || selectedYears.includes(game.releaseYear)) &&
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

  const handleGameView = (game) => {
    console.log("Game viewed:", game);
    setRecentlyViewed((prev) => {
      const newViewed = [game, ...prev.filter(g => g.id !== game.id)].slice(0, 8);
      console.log("New recently viewed:", newViewed);
      return newViewed;
    });
  };
  
  const scrollCarousel = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    
    const totalItems = featuredGames.length;
    let nextIndex = direction === 'left' 
      ? (currentCarouselIndex - 1 + totalItems) % totalItems 
      : (currentCarouselIndex + 1) % totalItems;
    
    setCurrentCarouselIndex(nextIndex);
    const scrollAmount = nextIndex * getItemWidth();
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollBudgetCarousel = (direction) => {
    const container = budgetCarouselRef.current;
    if (!container) return;
    
    const totalItems = budgetGames.length;
    let nextIndex = direction === 'left' 
      ? (currentBudgetCarouselIndex - 1 + totalItems) % totalItems 
      : (currentBudgetCarouselIndex + 1) % totalItems;
    
    setCurrentBudgetCarouselIndex(nextIndex);
    const scrollAmount = nextIndex * getItemWidth();
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRecentCarousel = (direction) => {
    const container = recentCarouselRef.current;
    if (!container) return;
    
    const totalItems = recentlyViewed.length;
    let nextIndex = direction === 'left' 
      ? (currentRecentCarouselIndex - 1 + totalItems) % totalItems 
      : (currentRecentCarouselIndex + 1) % totalItems;
    
    setCurrentRecentCarouselIndex(nextIndex);
    const scrollAmount = nextIndex * getItemWidth();
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
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

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleBudgetMouseEnter = () => setIsBudgetPaused(true);
  const handleBudgetMouseLeave = () => setIsBudgetPaused(false);
  const handleRecentMouseEnter = () => setIsRecentPaused(true);
  const handleRecentMouseLeave = () => setIsRecentPaused(false);

  if (loading)
    return (
      <div className="min-h-screen w-full bg-[#0d1b2a] text-white flex items-center justify-center animate-fade-in">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen w-full bg-[#0d1b2a] text-red-500 flex items-center justify-center animate-fade-in">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-[#1A1A22] min-h-screen text-white font-sans animate-fade-in">
      <div className="flex flex-row w-full gap-x-6 px-6 lg:px-24 py-10">
        {/* Sidebar */}
        <aside className="hidden lg:block bg-[white] p-6 border border-white rounded-lg w-1/4">
          <h2 className="text-2xl font-bold text-[black] mb-6">Filters</h2>
          <div className="mb-6">
            <h3 className="text-lg text-black font-semibold mb-3">Genres</h3>
            {genres.map((genre) => (
              <div key={genre.id} className="flex items-center text-black mb-2 ">
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
          </div>
          <div className="mb-6 ">
            <h3 className="text-lg text-black font-semibold mb-3">Price Range</h3>
            <input
              type="number"
              value={minPriceRange}
              onChange={(e) => handlePriceChange(setMinPriceRange, e.target.value)}
              className="w-full p-2 mb-2 rounded-lg bg-[white] border border-[#444] focus:border-[white] text-black placeholder-gray-400"
              placeholder="Min Price"
            />
            <input
              type="number"
              value={maxPriceRange}
              onChange={(e) => handlePriceChange(setMaxPriceRange, e.target.value)}
              className="w-full p-2 rounded-lg bg-[white] border border-[#444] focus:border-[white] text-black placeholder-gray-400"
              placeholder="Max Price"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3">Minimum Rating</h3>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-black mt-2">{minRating} / 5</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Release Year</h3>
            {Array.from(new Set(games.map((game) => game.releaseYear))).sort().map((year) => (
              <div key={year} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`year-${year}`}
                  checked={selectedYears.includes(year)}
                  onChange={() =>
                    setSelectedYears((prev) =>
                      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
                    )
                  }
                  className="mr-3 cursor-pointer"
                />
                <label htmlFor={`year-${year}`} className="cursor-pointer text-black">
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
              className="w-full p-3 rounded-lg border border-[#444] text-black focus:border-[white] focus:ring-0 placeholder-gray-400"
              placeholder="Search games..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGames.map((game) => {
              const cartItem = cart.find((item) => item.id === game.id);
              return (
                <div
                  key={game.id}
                  className="bg-[white] p-6 rounded-lg border border-[black] shadow-md transform transition-all duration-300 hover:scale-105"
                >
                  <Link href={`/shop/${game.id}`} onClick={() => handleGameView(game)}>
                    <img
                      src={game.imageUrls[0] || "/placeholder.svg"}
                      alt={game.title}
                      className="w-full h-40 object-cover border border-black rounded-md mb-4"
                    />
                    <h3 className="text-lg text-black font-bold">{game.title}</h3>
                    <p className="text-sm text-black mb-2">{game.genre.name}</p>
                    <p className="text-sm text-black mb-2">{game.releaseYear}</p>
                    <p className="text-sm text-black mb-2">Tags - Placeholder </p>
                    <div className="text-yellow-500 flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < Math.floor(game.rating) ? "★" : "☆"}</span>
                      ))}
                      <span className="text-sm ml-2">({game.rating})</span>
                    </div>
                  </Link>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[white]">
                      ${parseFloat(game.price).toFixed(2)}
                    </span>
                    {cartItem ? (
                      <div className="flex items-center">
                        <button
                          className="bg-[white] p-2 rounded-lg text-black"
                          onClick={() => updateQuantity(game.id, cartItem.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3">{cartItem.quantity}</span>
                        <button
                          className="bg-[white] p-2 rounded-lg text-black"
                          onClick={() => updateQuantity(game.id, cartItem.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-[black] text-black px-4 py-2 text-white rounded-lg font-bold hover:scale-105"
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
                className="bg-[white] text-black px-4 py-2 rounded-lg hover:scale-110"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-[white] text-black px-4 py-2 rounded-lg hover:scale-110"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* First Carousel: Featured Games */}
      <div className="container mx-auto scale-110 py-12 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-white mb-8">Recomended Games:</h2>
        
        <div className="relative">
          <button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={carouselRef} 
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {featuredGames.map((game) => (
              <div key={game.id} className="flex-none w-full sm:w-96 mx-2 snap-start">
                <Link href={`/shop/${game.id}`} onClick={() => handleGameView(game)}>
                  <div className="border border-[#444] bg-white rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={game.imageUrls[0] || "/placeholder.svg"} 
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black truncate">{game.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-yellow-500 flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-sm">{i < Math.floor(game.rating) ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <span className="text-lg font-bold text-black">
                          ${parseFloat(game.price).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="mt-3 w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-[#5A5A8A] transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentCarouselIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => {
                setCurrentCarouselIndex(index);
                carouselRef.current.scrollTo({
                  left: index * getItemWidth(),
                  behavior: 'smooth',
                });
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Second Carousel: Games Under £20 */}
      <div className="container mx-auto scale-110 py-12 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Games:</h2>
        
        <div className="relative">
          <button 
            onClick={() => scrollBudgetCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={budgetCarouselRef} 
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleBudgetMouseEnter}
            onMouseLeave={handleBudgetMouseLeave}
          >
            {budgetGames.map((game) => (
              <div key={game.id} className="flex-none w-full sm:w-96 mx-2 snap-start">
                <Link href={`/shop/${game.id}`} onClick={() => handleGameView(game)}>
                  <div className="border border-[#444] bg-white rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={game.imageUrls[0] || "/placeholder.svg"} 
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black truncate">{game.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-yellow-500 flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-sm">{i < Math.floor(game.rating) ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <span className="text-lg font-bold text-black">
                          £{parseFloat(game.price).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="mt-3 w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-[#5A5A8A] transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollBudgetCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {budgetGames.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentBudgetCarouselIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => {
                setCurrentBudgetCarouselIndex(index);
                budgetCarouselRef.current.scrollTo({
                  left: index * getItemWidth(),
                  behavior: 'smooth',
                });
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      
      {/* Second Carousel: Games Under £20 */}
      <div className="container mx-auto scale-110 py-12 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-white mb-8">Games Under £20:</h2>
        
        <div className="relative">
          <button 
            onClick={() => scrollBudgetCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={budgetCarouselRef} 
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleBudgetMouseEnter}
            onMouseLeave={handleBudgetMouseLeave}
          >
            {budgetGames.map((game) => (
              <div key={game.id} className="flex-none w-full sm:w-96 mx-2 snap-start">
                <Link href={`/shop/${game.id}`} onClick={() => handleGameView(game)}>
                  <div className="border border-[#444] bg-white rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={game.imageUrls[0] || "/placeholder.svg"} 
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black truncate">{game.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-yellow-500 flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-sm">{i < Math.floor(game.rating) ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <span className="text-lg font-bold text-black">
                          £{parseFloat(game.price).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="mt-3 w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-[#5A5A8A] transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollBudgetCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {budgetGames.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentBudgetCarouselIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => {
                setCurrentBudgetCarouselIndex(index);
                budgetCarouselRef.current.scrollTo({
                  left: index * getItemWidth(),
                  behavior: 'smooth',
                });
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      
      
    </div>
  );
}

export default ShopPage;