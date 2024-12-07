"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/cart-context'
import Link from "next/link";

function Product() {
    const [mainImage, setMainImage] = useState("/placeholder.svg");
    const [currentIndex, setCurrentIndex] = useState(0);
    const params = useParams()
    const { cart, addToCart, updateQuantity } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://51.77.110.253:3001/api/products/${params.product}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setGame(data);
                setLoading(false);
            } catch (error) {
                setError('An error occurred while fetching the product');
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
                quantity: quantity
            })
        }
    }

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
            if (cart.some(item => item.id === game.id)) {
                updateQuantity(game.id, newQuantity)
            }
        }
    }

    if (loading) return <div className="min-h-screen w-full bg-gray-800 text-white flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen w-full bg-gray-800 text-white flex items-center justify-center">Error: {error}</div>;
    if (!game) return <div className="min-h-screen w-full bg-gray-800 text-white flex items-center justify-center">Product not found</div>;

    // const images = game.imageUrls ? JSON.parse(game.imageUrls) : ["/placeholder.svg"];
    const images = ["https://fakeimg.pl/440x320/282828/eae0d0/?retina=1"]

    return (
        <div className="min-h-screen w-full bg-gray-800 ">
            <div className='w-full flex flex-row justify-center gap-x-20  py-10 text-white font-black text-lg'>
                <div className="text-center ">
                    <h1 className="text-1xl font-bold mb-4">
                        <Link href="/shop">
                            <span className="hover:text-yellow-500">All Games</span>
                        </Link> - {game.title}
                    </h1>
                    <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
                    <img
                        src={mainImage}
                        alt={`Main ${game.title} Image`}
                        className="w-96 mb-6 mx-auto border-2 border-white rounded-xl"
                    />
                    {/* Smaller Images */}
                    <div className="flex justify-center space-x-4 ">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Small ${game.title} Image ${index + 1}`}
                                className={`w-16 cursor-pointer border-2  ${mainImage === image ? "border-yellow-500" : "border-white"}`}
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>

                    <ul className="list-disc list-inside mt-3 text-left pt-10">
                        <h1 className="text-2xl font-bold mb-4">System Requirements</h1>
                        <hr className="border-t-2 border-white my-4" />
                        <li>Requires a 64-bit processor and operating system</li>
                        <li>OS: Windows 10</li>
                        <li>Processor: Intel Core i5 or equivalent</li>
                        <li>Graphics: DirectX 11 compatible GPU</li>
                        <li>DirectX: Version 11</li>
                        <li>Network: Broadband Internet connection</li>
                        <li>Storage: 50 GB available space</li>
                    </ul>
                </div>
                <div className="pt-20">
                    <h1 className="w-[375px] text-1xl font-bold mb-4">{game.description}</h1>
                    <h1 className="text-2xl font-bold mb-4">Release Date: {new Date(game.releaseYear, 0).getFullYear()}</h1>
                    <h1 className="text-2xl font-bold mb-4">Genre: {game.genre.name}</h1>
                    <hr className="border-t-2 border-white my-4" />

                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold mb-4">${parseFloat(game.price).toFixed(2)}</h1>
                        <button 
                            className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 hover:scale-110"
                            onClick={handleAddToCart}
                        >
                            ADD TO CART
                        </button>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
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
                    <br></br>
                    <h1 className="text-2xl font-bold mb-4 ">Rating: {game.rating}/5</h1>
                </div>
            </div>
        </div>
    );
}

export default Product;

