"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Filter } from "lucide-react";
import { useCart } from "../../context/cart-context";
import { useSearchParams } from "next/navigation";

function ShopPage() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [featuredGames, setFeaturedGames] = useState([]);
  const [budgetGames, setBudgetGames] = useState([]);
  const [recommendedGames, setRecommendedGames] = useState([]);
  
  const [carouselStates, setCarouselStates] = useState({
    featured: { index: 0, paused: false },
    budget: { index: 0, paused: false },
    recommended: { index: 0, paused: false }
  });
  
  const carouselRefs = {
    featured: useRef(null),
    budget: useRef(null),
    recommended: useRef(null)
  };
  
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre");
  const [selectedGenres, setSelectedGenres] = useState(initialGenre ? [initialGenre] : []);
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [selectedYears, setSelectedYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [showFilters, setShowFilters] = useState(false);
  
  const { cart, addToCart, updateQuantity } = useCart();
  const itemsPerPage = 6;

  const getItemWidth = (type) => {
    if (!carouselRefs[type].current) return 0;
    const items = carouselRefs[type].current.querySelectorAll('.carousel-item');
    if (items.length === 0) return 0;
    return items[0].offsetWidth;
  };

  useEffect(() => {
    Object.keys(carouselRefs).forEach(key => {
      if (carouselRefs[key].current) {
        carouselRefs[key].current.scrollLeft = 0;
      }
    });
    
    const carouselIntervals = {};
    
    Object.keys(carouselRefs).forEach(key => {
      const interval = setInterval(() => {
        const { index, paused } = carouselStates[key];
        const ref = carouselRefs[key].current;
        const items = key === 'featured' ? featuredGames : 
                      key === 'budget' ? budgetGames : 
                      recommendedGames;
                      
        if (!paused && ref && items.length > 0) {
          const totalItems = items.length;
          const nextIndex = (index + 1) % totalItems;
          const itemWidth = getItemWidth(key);
          
          setCarouselStates(prev => ({
            ...prev,
            [key]: { ...prev[key], index: nextIndex }
          }));
          
          ref.scrollTo({
            left: nextIndex * itemWidth,
            behavior: 'smooth',
          });
        }
      }, 6000);
      
      carouselIntervals[key] = interval;
    });
    
    return () => {
      Object.values(carouselIntervals).forEach(interval => clearInterval(interval));
    };
  }, [carouselStates, featuredGames.length, budgetGames.length, recommendedGames.length]);

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
        
        setFeaturedGames([...productsData].sort((a, b) => b.rating - a.rating).slice(0, 8));
        
        setBudgetGames(productsData.filter(game => parseFloat(game.price) < 20).slice(0, 8));
        
        setRecommendedGames([...productsData].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, 8));
        
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data");
        setLoading(false);
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: parseFloat(game.price),
      quantity: 1,
      img: game.imageUrls[0]
    });
  };

  const handleGameView = (game) => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const newViewed = [game.id, ...recentlyViewed.filter(id => id !== game.id)].slice(0, 8);
    localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
  };
  
  const scrollCarousel = (type, direction) => {
    const container = carouselRefs[type].current;
    if (!container) return;
    
    const items = type === 'featured' ? featuredGames : 
                  type === 'budget' ? budgetGames : 
                  recommendedGames;
    
    const totalItems = items.length;
    const currentIndex = carouselStates[type].index;
    const itemWidth = getItemWidth(type);
    
    const nextIndex = direction === 'left' 
      ? (currentIndex - 1 + totalItems) % totalItems 
      : (currentIndex + 1) % totalItems;
    
    setCarouselStates(prev => ({
      ...prev,
      [type]: { ...prev[type], index: nextIndex }
    }));
    
    container.scrollTo({
      left: nextIndex * itemWidth,
      behavior: 'smooth',
    });
  };

  const handleCarouselPause = (type, isPaused) => {
    setCarouselStates(prev => ({
      ...prev,
      [type]: { ...prev[type], paused: isPaused }
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen w-full bg-[#1A1A22] text-white flex items-center justify-center">
        <div className="animate-spin mr-2 h-6 w-6 border-t-2 border-white rounded-full"></div>
        <span>Loading...</span>
      </div>
    );
    
  if (error)
    return (
      <div className="min-h-screen w-full bg-[#1A1A22] text-red-500 flex items-center justify-center">
        Error: {error}
      </div>
    );

  const GameCard = ({ game, isCarousel = false }) => {
    const cartItem = cart.find((item) => item.id === game.id);
    return (
      <div className={`bg-[#252530] rounded-lg border border-[#3A3A4A] ${isCarousel ? '' : 'transform transition-all duration-300 hover:scale-105 hover:shadow-glow'}`}>
        <Link href={`/shop/${game.id}`} onClick={() => handleGameView(game)}>
          <div className="p-4">
            <div className="h-40 overflow-hidden rounded-md mb-4">
              <img
                src={game.imageUrls[0] || "/placeholder.svg"}
                alt={game.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
            <p className="text-sm text-gray-300 mb-1">{game.genre.name}</p>
            <p className="text-sm text-gray-400 mb-1">{game.releaseYear}</p>

            <div className="text-yellow-400 flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm">{i < Math.floor(game.rating) ? "★" : "☆"}</span>
              ))}
              <span className="text-sm ml-2 text-gray-300">({game.rating})</span>
            </div>
          </div>
        </Link>
        <div className="p-4 mt-4 flex justify-between items-center border-t border-[#3A3A4A] pt-3">
          <span className="text-lg font-bold text-white whitespace-nowrap">
            ${parseFloat(game.price).toFixed(2)}
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
              className="bg-[#FFA800] hover:bg-[#e08800] px-5 py-2 text-black rounded-full font-bold transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(game);
              }}
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
  };

  const GameCarousel = ({ title, games, type }) => {
    if (!games.length) return null;
    
    return (
      <div className="relative">
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
        
        <div className="relative">
          <button 
            onClick={() => scrollCarousel(type, 'left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={carouselRefs[type]} 
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => handleCarouselPause(type, true)}
            onMouseLeave={() => handleCarouselPause(type, false)}
          >
            {games.map((game) => (
              <div key={game.id} className="flex-none w-full sm:w-96 mx-2 snap-start carousel-item">
                <Link href={`/shop/${game.id}`} onClick={() => handleGameView(game)}>
                  <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg overflow-hidden hover:shadow-glow hover:scale-105 transition duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={game.imageUrls[0] || "/placeholder.svg"} 
                        alt={game.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white truncate">{game.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-yellow-400 flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-sm">{i < Math.floor(game.rating) ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <span className="text-lg font-bold text-white">
                          ${parseFloat(game.price).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="mt-3 w-full bg-[#FFA800] hover:bg-[#e08800] text-black py-2 rounded-full font-bold transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ShoppingCart size={16} />
                          Add to Cart
                        </div>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollCarousel(type, 'right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === carouselStates[type].index ? 'bg-[#FFA800]' : 'bg-gray-600'
              }`}
              onClick={() => {
                setCarouselStates(prev => ({
                  ...prev,
                  [type]: { ...prev[type], index: index }
                }));
                
                if (carouselRefs[type].current) {
                  const items = carouselRefs[type].current.querySelectorAll('.carousel-item');
                  if (items.length > 0) {
                    const itemWidth = items[0].offsetWidth;
                    carouselRefs[type].current.scrollTo({
                      left: index * itemWidth,
                      behavior: 'smooth',
                    });
                  }
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#1A1A22] min-h-screen text-white font-sans">
      <div className="flex flex-col lg:flex-row w-full gap-6 px-4 lg:px-16 py-8">
        <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block bg-[#252530] p-6 rounded-lg border border-[#3A3A4A] self-start`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Filters</h2>
            <button 
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setShowFilters(false)}
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg text-white font-semibold mb-3">Genres</h3>
            {genres.map((genre) => (
              <div key={genre.id} className="flex items-center text-gray-200 mb-2">
                <input
                  type="checkbox"
                  id={genre.id}
                  checked={selectedGenres.includes(genre.name)}
                  onChange={() => handleGenreChange(genre.name)}
                  className="mr-3 cursor-pointer accent-[#FFA800]"
                />
                <label htmlFor={genre.id} className="cursor-pointer">
                  {genre.name}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg text-white font-semibold mb-3">Price Range</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">$</span>
              <input
                type="number"
                value={minPriceRange}
                onChange={(e) => handlePriceChange(setMinPriceRange, e.target.value)}
                className="w-full p-2 rounded-lg bg-[#3A3A4A] border border-[#4A4A5A] focus:border-[#FFA800] text-white placeholder-gray-400"
                placeholder="Min Price"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">$</span>
              <input
                type="number"
                value={maxPriceRange}
                onChange={(e) => handlePriceChange(setMaxPriceRange, e.target.value)}
                className="w-full p-2 rounded-lg bg-[#3A3A4A] border border-[#4A4A5A] focus:border-[#FFA800] text-white placeholder-gray-400"
                placeholder="Max Price"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Minimum Rating</h3>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full accent-[#FFA800]"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-white mt-1">{minRating} / 5</p>
              <div className="text-yellow-400 flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">{i < Math.floor(minRating) ? "★" : "☆"}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Release Year</h3>
            {Array.from(new Set(games.map((game) => game.releaseYear)))
              .sort((a, b) => b - a)
              .map((year) => (
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
                    className="mr-3 cursor-pointer accent-[#FFA800]"
                  />
                  <label htmlFor={`year-${year}`} className="cursor-pointer text-gray-200">
                    {year}
                  </label>
                </div>
              ))}
          </div>
        </aside>

        <main className="lg:w-3/4">
          <div className="mb-6 flex justify-start items-center">
            <button
              className="lg:hidden mr-4 p-2 bg-[#252530] rounded-lg text-white"
              onClick={() => setShowFilters(true)}
            >
              <Filter size={20} />
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#252530] text-white focus:border-[#FFA800] focus:ring-0 placeholder-gray-400"
              placeholder="Search games..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                className="bg-[#3A3A4A] text-white px-4 py-2 rounded-lg hover:bg-[#4A4A5A] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
              </button>
              <span className="flex items-center text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-[#3A3A4A] text-white px-4 py-2 rounded-lg hover:bg-[#4A4A5A] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>

      <div className="mt-8 px-4 lg:px-16 space-y-16 pb-16">
        <GameCarousel title="Featured Games" games={featuredGames} type="featured" />
        <GameCarousel title="Budget Games" games={budgetGames} type="budget" />
        <GameCarousel title="Recommended Games" games={recommendedGames} type="recommended" />
      </div>
    </div>
  );
}

export default ShopPage;