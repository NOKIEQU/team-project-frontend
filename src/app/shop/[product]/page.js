"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/cart-context";
import Link from "next/link";

function Product() {
  const [mainImage, setMainImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setMainImage(data.imageUrls[0]);
        console.log(data.imageUrls);
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

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      if (cart.some((item) => item.id === game.id)) {
        updateQuantity(game.id, newQuantity);
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen w-full bg-gray-800 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen w-full bg-gray-800 text-white flex items-center justify-center">
        Error: {error}
      </div>
    );
  if (!game)
    return (
      <div className="min-h-screen w-full bg-gray-800 text-white flex items-center justify-center">
        Product not found
      </div>
    );

  const images = game.imageUrls;
  // const images = ["https://fakeimg.pl/440x320/282828/eae0d0/?retina=1"]

  return (
    <div className="min-h-screen w-full bg-gray-800">
      {/* Main Content Wrapper */}
      <div className="container mx-auto px-4 py-10 text-white">
        {/* Title and Images Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section: Game Details */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold mb-4">
              <Link href="/shop">
                <span className="hover:text-yellow-500">All Games</span>
              </Link>{" "}
              - {game.title}
            </h1>
            <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
            <img
              src={mainImage}
              alt={`Main ${game.title} Image`}
              className="w-96 mx-auto mb-6 border-2 border-white rounded-xl"
            />

            {/* Thumbnail Images */}
            <div className="flex justify-center space-x-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 cursor-pointer border-2 ${
                    mainImage === image ? "border-yellow-500" : "border-white"
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>

            {/* System Requirements */}
            <div className="text-left mt-10">
              <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
              <hr className="border-t-2 border-white my-4" />
              <ul className="list-disc list-inside space-y-2">
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
          <div className="flex-1 pt-10 lg:pt-0">
            <div className="mb-6">
              <h1 className="text-lg font-bold mb-4">{game.description}</h1>
              <h2 className="text-2xl font-bold mb-4">
                Release Date: {new Date(game.releaseYear, 0).getFullYear()}
              </h2>
              <h2 className="text-2xl font-bold mb-4">Genre: {game.genre.name}</h2>
              <hr className="border-t-2 border-white my-4" />
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">${parseFloat(game.price).toFixed(2)}</h2>
              <button
                className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 hover:scale-110"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center space-x-4">
              <button
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Rating */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold">Rating: {game.rating}/5</h2>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <hr className="border-t-2 border-white my-4 opacity-50" />
          <h1 className="text-[35px] font-sans font-bold text-white">Reviews</h1>

          {/* Individual Reviews */}
          <div className="mt-6 space-y-4">
            {/* First Review */}
            <div className="border rounded-xl bg-[#1b263b] p-4">
              <h2 className="text-lg font-bold mb-2">Debbie Downer - I Don't Like This Game</h2>
              <p className="text-xl font-bold mb-2">1/5</p>
              <p className="text-sm text-gray-400 text-right">Posted on 6/12/2024</p>
            </div>

            {/* Second Review */}
            <div className="border rounded-xl bg-[#1b263b] p-4">
              <h2 className="text-lg font-bold mb-2">Positive Peter - I Like This Game</h2>
              <p className="text-xl font-bold mb-2">5/5</p>
              <p className="text-sm text-gray-400 text-right">Posted on 4/12/2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

   
export default Product;
