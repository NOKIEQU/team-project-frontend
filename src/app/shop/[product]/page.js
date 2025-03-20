"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/cart-context";
import { ChevronLeft, ChevronRight, Minus, Plus, Star } from "lucide-react";
import Link from "next/link";
import { useUser } from "../../../context/user-context";

function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "" });
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  // const loggedInUser = { name: "John Doe" };
  const { user: loggedInUser } = useUser();

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
        setImages(data.imageUrls || []);
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

  // Fetch reviews for the product
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

    <div className="min-h-screen w-full bg-[#1A1A22]">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <div className="container   mx-auto px-18 py-10 text-white">
        <div className="flex flex-col  border-1 lg:flex-row gap-10">
          
          
            
          
          

          {/* Left Section: Game Details */}
          <div className="flex-1  text-center">
            <h1 className="text-xl font-bold mb-4">
              <Link href="/shop">
                <span className="hover:text-yellow-500">All Games</span>
              </Link>{" "}
              - {game.title}
            </h1>

            <img
              src={game.imageUrls[currentImageIndex]}
              alt={`Main ${game.title} Image`}

              className="w-108  h-[400px] object-cover mx-auto mb-6 border-2 border-white rounded-xl"
            />
            <div className="flex justify-center space-x-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-32 cursor-pointer border-2 ${mainImage === image ? "border-black" : "border-white"
                    }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>

            <div className="text-left border border-white h-[320px] mt-10">
              <h2 className="text-2xl font-bold ml-[20px]  mb-4">System Requirements</h2>
              <hr className="border-t-2 border-white mr-[20px] ml-[20px] my-4" />
              <ul className="list-disc list-inside ml-[20px]  space-y-2">
                <li>Requires a 64-bit processor and operating system</li>
                <li>OS: Windows 10</li>
                <li>Processor: Intel Core i5 or equivalent</li>
                <li>Graphics: DirectX 11 compatible GPU</li>
                <li>DirectX: Version 11</li>
                <li>Network: Broadband Internet connection</li>
                <li>Storage: 50 GB available space</li>
                
              </ul>
            </div>
          </div>

          {/* Right Section: Description and Cart */}
          <div className="flex-1   mt-20 pt-10">
            <div className="mb-6">
              <h1 className="text-xl nt-bold mb-6">{game.description}</h1>
              <h2 className="text-2xl font-bold mb-6">
                Release Date: {new Date(game.releaseYear, 0).getFullYear()}
              </h2>
              <h2 className="text-2xl font-bold mb-4">Genre: {game.genre.name}</h2>
              <hr className="border-t-2 border-white my-4" />

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




            <div className="mt-6">
              <h2 className="text-2xl font-bold">Rating: {game.rating}/5</h2>
            </div>

            <div className="text-left border border-white h-[320px] mt-[175px] ">
              <h2 className="text-2xl font-bold ml-[20px]  mb-4">Features</h2>
              <hr className="border-t-2 border-white mr-[20px] ml-[20px] my-4" />
              <ul className="list-disc list-inside ml-[20px]  space-y-2">
                <li>Single-Player</li>
                <li>Multi-Player</li>
                <li>LAN </li>
                <li>Co-Op</li>
                <li>Supports Achievments</li>
                <li>DLC Content</li>
                
                
              </ul>
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