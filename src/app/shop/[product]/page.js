"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/cart-context";
import { ChevronLeft, ChevronRight, Minus, Plus, Star } from "lucide-react";

function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "" });
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const loggedInUser = { name: "John Doe" };

  // Fetch product data
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
        setReviews(data.reviews || []);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching the product");
        setLoading(false);
      }
    };

    if (params.product) {
      fetchProduct();
    }
  }, [params.product]);

  // Next image
  const handleNextImage = () => {
    if (game && game.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === game.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Previous image
  const handlePrevImage = () => {
    if (game && game.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? game.imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (game) {
      addToCart({
        id: game.id,
        title: game.title,
        price: parseFloat(game.price),
        quantity: quantity,
      });
    }
  };

  // Quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Review submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const reviewToAdd = {
        name: loggedInUser.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString("en-GB"),
      };
      setReviews([reviewToAdd, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A22] text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A22] text-red-500">
        Error: {error}
      </div>
    );

  if (!game)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A22] text-white">
        Product not found
      </div>
    );

  // Product details
  return (
    <div className="min-h-screen bg-[#1A1A22] text-white">
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2 relative">
            <img
              src={game.imageUrls[currentImageIndex]}
              alt={`Main ${game.title} Image`}
              className="w-full border-2 border-white rounded-lg shadow-lg"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
            >
              <ChevronLeft size={30} className="text-white" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
            >
              <ChevronRight size={30} className="text-white" />
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">{game.title}</h1>
              <p className="text-gray-400 mt-2">{game.description}</p>
              <div className="flex items-center mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-3xl ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-500"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-400 ml-2">({averageRating.toFixed(1)})</span>
              </div>
              <div className="mt-6">
                <h2 className="text-4xl font-bold text-white">
                  ${parseFloat(game.price).toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <button className="bg-white text-black px-3 py-2 rounded-lg hover:scale-105 transition" onClick={() => handleQuantityChange(quantity - 1)}>
                <Minus size={20} />
              </button>
              <span className="text-xl">{quantity}</span>
              <button className="bg-white text-black px-3 py-2 rounded-lg hover:scale-105 transition" onClick={() => handleQuantityChange(quantity + 1)}>
                <Plus size={20} />
              </button>
            </div>
            <div className="mt-4">
              <button className="w-full max-w-sm bg-white text-black font-bold py-2 px-6 rounded-lg hover:scale-105 transition" onClick={handleAddToCart}>
                Add to Basket
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-2 gap-6 text-center">
          <div className="bg-[#1A1A22] p-4 rounded-lg border border-white">
            <p className="text-gray-400">Release Date</p>
            <p className="text-xl font-bold text-white">
              {new Date(game.releaseYear, 0, 1).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="bg-[#1A1A22] p-4 rounded-lg border border-white">
            <p className="text-gray-400">Developer</p>
            <p className="text-xl font-bold text-white">{game.developer || "Unknown"}</p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-bold">Reviews</h2>
          {!showReviewForm && (
            <button
              className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-lg"
              onClick={() => setShowReviewForm(true)}
            >
              Create a Review
            </button>
          )}
          {showReviewForm && (
            <form className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600" onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <span className="text-gray-400 text-lg">Rating:</span>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`text-3xl focus:outline-none ${index < newReview.rating ? "text-yellow-400" : "text-gray-500"}`}
                      onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-lg w-full hover:scale-105 transition"
              >
                Submit Review
              </button>
            </form>
          )}
          <div className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-gray-400">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <strong>{review.name}</strong> - <span>{review.date}</span>
                  <div className="text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
