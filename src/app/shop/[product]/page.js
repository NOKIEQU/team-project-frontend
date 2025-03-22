"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/cart-context";
import { useUser } from "../../../context/user-context";
import { 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  Star, 
  ShoppingCart,
  ArrowLeft,
  Gift
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const { user } = useUser();
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  // Reviews states
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [relatedGames, setRelatedGames] = useState([]);
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const cartItem = game ? cart.find(item => item.id === game.id) : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://51.77.110.253:3001/api/products/${params.product}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setGame(data);
        setImages(data.imageUrls || []);
        setLoading(false);
        
        fetchRelatedGames(data.genre.id);
      } catch (error) {
        setError("An error occurred while fetching the product");
        setLoading(false);
      }
    };

    if (params.product) {
      fetchProduct();
    }
  }, [params.product]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://51.77.110.253:3001/api/reviews/${params.product}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (params.product) {
      fetchReviews();
    }
  }, [params.product]);
  
  const fetchRelatedGames = async (genreId) => {
    try {
      const response = await fetch(`http://51.77.110.253:3001/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch related games");
      }
      const data = await response.json();
      
      const related = data
        .filter(g => g.genre.id === genreId && g.id !== params.product)
        .slice(0, 4); // Limit to 4 related games
        
      setRelatedGames(related);
    } catch (error) {
      console.error("Error fetching related games:", error);
    }
  };

  const handleNextImage = () => {
    if (game && game.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === game.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (game && game.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? game.imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  const handleAddToCart = () => {
    if (game) {
      addToCart({
        id: game.id,
        title: game.title,
        price: parseFloat(game.price),
        quantity: quantity,
        img: game.imageUrls[0]
      });
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.comment.trim() && user) {
      const reviewToAdd = {
        name: user.name || `${user.firstName} ${user.lastName}`,
        rating: newReview.rating || 5,
        comment: newReview.comment,
        date: new Date().toLocaleDateString("en-GB"),
      };
      setReviews([reviewToAdd, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
    } else {
      alert("Please log in to submit a review");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A22] text-white">
        <div className="animate-spin mr-2 h-8 w-8 border-t-2 border-white rounded-full"></div>
        <span>Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A22] text-red-500">
        <p>Error: {error}</p>
      </div>
    );

  if (!game)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A22] text-white">
        <p>Product not found</p>
      </div>
    );

  const renderRating = (rating, size = "sm") => {
    const numericRating = Number(rating) || 0;
    
    return (
      <div className={`flex items-center text-yellow-400 ${size === "lg" ? "text-xl" : "text-sm"}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={size === "lg" ? 24 : 16}
            fill={index < Math.floor(numericRating) ? "currentColor" : "none"}
            className={index < Math.floor(numericRating) ? "text-yellow-400" : "text-gray-400"}
          />
        ))}
        <span className="ml-2 text-white">{numericRating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1A22] text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">•</span>
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <span className="mx-2">•</span>
            <span className="text-white">{game.title}</span>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden h-96 md:h-[500px] bg-[#252530] border border-[#3A3A4A]">
              {/* Main image */}
              <img
                src={game.imageUrls[currentImageIndex]}
                alt={`${game.title} Image`}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {game.imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
              {game.imageUrls.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`cursor-pointer rounded-md overflow-hidden h-20 w-20 flex-shrink-0 border-2 ${
                    index === currentImageIndex ? "border-[#FFA800]" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${game.title} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-[#252530] rounded-xl border border-[#3A3A4A] p-6 h-[500px] md:h-[500px] overflow-y-auto">
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center text-[#FFA800]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={index < Math.floor(game.rating) ? "currentColor" : "none"}
                        className={index < Math.floor(game.rating) ? "text-[#FFA800]" : "text-gray-400"}
                      />
                    ))}
                    <span className="ml-2 text-white">{Number(game.rating).toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-gray-400">|</span>
                <div className="text-gray-300">
                  {game.genre.name}
                </div>
                <span className="text-gray-400">|</span>
                <div className="text-gray-300">
                  Released: {new Date(game.releaseYear, 0, 1).getFullYear()}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-white mb-6">
                £{parseFloat(game.price).toFixed(2)}
              </div>
              
              <p className="text-gray-300 mb-8">
                {game.description}
              </p>
              
              <div className="border-t border-[#3A3A4A] pt-8 mb-6"></div>
              
              <div className="flex items-center mb-6">
                <div className="flex bg-[#1A1A22] border border-[#3A3A4A] rounded-full overflow-hidden">
                  <button
                    className="p-3 bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex items-center justify-center px-6">{quantity}</span>
                  <button
                    className="p-3 bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="ml-4 flex-1">
                  {cartItem ? (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => updateQuantity(game.id, cartItem.quantity + quantity)}
                        className="flex-1 px-6 py-3 bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white rounded-full font-semibold transition-colors duration-200 flex items-center justify-center"
                      >
                        <Plus size={18} className="mr-2" />
                        Update Cart
                      </button>
                      <Link href="/basket">
                        <button className="px-6 py-3 bg-[#FFA800] hover:bg-[#e08800] text-white rounded-full font-semibold transition-colors duration-200 flex items-center justify-center">
                          View Cart
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full px-6 py-3 bg-[#FFA800] hover:bg-[#e08800] text-white rounded-full font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 bg-[#1A1A22] p-4 rounded-lg border border-[#3A3A4A]">
                  <Gift size={20} className="text-[#FFA800]" />
                  <div>
                    <div className="text-sm text-gray-400">Developer</div>
                    <div className="font-medium">{game.developer || "Unknown"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A22] p-4 rounded-lg border border-[#3A3A4A]">
                  <Star size={20} className="text-[#FFA800]" />
                  <div>
                    <div className="text-sm text-gray-400">Release Date</div>
                    <div className="font-medium">
                      {new Date(game.releaseYear, 0, 1).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16">
          <div className="bg-[#252530] rounded-xl border border-[#3A3A4A] p-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-xl font-bold text-[#FFA800]">Customer Reviews</h2>
              {!showReviewForm && (
                <button
                  className="px-6 py-3 bg-[#FFA800] hover:bg-[#FF7A00] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write a Review
                </button>
              )}
            </div>
            
            {/* Review Form */}
            {showReviewForm && (
              <div className="bg-[#1A1A22] p-2 rounded-lg mb-8 border border-[#3A3A4A]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Write Your Review</h3>
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </div>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-3">Your Rating</label>
                    <div className="flex space-x-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="text-3xl focus:outline-none transform transition-transform hover:scale-110"
                        >
                          <Star
                            size={32}
                            fill={star <= newReview.rating ? "#FFA800" : "none"}
                            className={star <= newReview.rating ? "text-[#FFA800] drop-shadow-glow" : "text-gray-500"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-3">Your Review</label>
                    <textarea
                      className="w-full p-4 bg-[#252530] border border-[#3A3A4A] rounded-lg text-white focus:border-[#FFA800] focus:ring-1 focus:ring-[#FFA800]"
                      rows={6}
                      placeholder="Tell us what you think about this game..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-3 bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white rounded-full font-semibold transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#FFA800] hover:bg-[#FF7A00] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-gradient-to-r from-[#1E1E2A] to-[#252535] p-8 rounded-xl mb-8 border border-[#3A3A4A] shadow-lg flex flex-col md:flex-row items-center gap-8">
              <div className="text-center md:border-r md:border-[#3A3A4A] md:pr-8 mb-6 md:mb-0">
                <div className="text-6xl font-bold text-[#FFA800]">
                  {Number(averageRating).toFixed(1)}
                </div>
                <div className="mt-3">{renderRating(averageRating, "lg")}</div>
                <div className="text-white mt-3 font-medium">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</div>
              </div>
              <div className="flex-1">
                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    
                    return (
                      <div key={star} className="flex items-center">
                        <div className="flex items-center text-white font-medium w-16">
                          {star} <Star size={16} className="ml-1 text-[#FFA800]" fill="#FFA800" />
                        </div>
                        <div className="w-full mx-4 h-3 bg-[#3A3A4A] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FFA800]"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-white w-14 text-right font-medium">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-[#1A1A22] rounded-xl border border-[#3A3A4A]">
                  <Star size={48} className="mx-auto mb-4 text-gray-600" />
                  <p className="text-xl text-gray-400 font-medium">No reviews yet. Be the first to review this game!</p>
                </div>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="bg-gradient-to-r from-[#1A1A22] to-[#222230] p-6 rounded-xl border border-[#3A3A4A] hover:border-[#FFA800] transition-all duration-200 shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <div className="bg-gradient-to-r from-[#FFA800] to-[#FF7A00] h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl text-white">{review.name}</h4>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < review.rating ? "#FFA800" : "none"}
                                className={i < review.rating ? "text-[#FFA800]" : "text-gray-500"}
                              />
                            ))}
                            <span className="ml-2 text-gray-400 text-sm">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-[#FFA800] to-[#FF7A00] text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center shadow-md">
                        {review.rating}
                      </div>
                    </div>
                    <div className="bg-[#1E1E2A] p-4 rounded-lg mt-2">
                      <p className="text-gray-200 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-16"></div>
      </div>
    </div>
  );
}

export default Product;