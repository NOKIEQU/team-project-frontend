"use client";

import { useState, useEffect } from "react";
// import Navbar from "../components/navbar";
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/cart-context'
import Link from "next/link";

const games = [
    {
      id: 1,
      title: "Elden Ring",
      genre: "Action RPG",
      price: 59.99,
      rating: 4.8,
      releaseYear: 2022,
      description: "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment.",
      reviews: [
        { id: 1, author: "John Doe", avatar: "JD", rating: 5, content: "Amazing game! The open world is breathtaking.", helpful: 42, notHelpful: 3 },
        { id: 2, author: "Jane Smith", avatar: "JS", rating: 4, content: "Great game, but the difficulty can be frustrating at times.", helpful: 28, notHelpful: 5 },
      ]
    },
    {
      id: 2,
      title: "FIFA 23",
      genre: "Sports",
      price: 59.99,
      rating: 4.5,
      releaseYear: 2022,
      description: "FIFA 23 is a football simulation video game published by Electronic Arts. It's the latest installment in the FIFA series.",
      reviews: [
        { id: 3, author: "Emily Chen", avatar: "EC", rating: 5, content: "The most realistic football game yet! Graphics are incredible.", helpful: 56, notHelpful: 2 },
        { id: 4, author: "Mike Johnson", avatar: "MJ", rating: 4, content: "Great gameplay, but not much different from last year's version.", helpful: 34, notHelpful: 8 },
      ]
    },
    {
      id: 3,
      title: "Stardew Valley",
      genre: "Simulation",
      price: 14.99,
      rating: 4.9,
      releaseYear: 2016,
      description: "Stardew Valley is a simulation role-playing game developed by ConcernedApe. Players take on the role of a character who inherits their grandfather's old farm plot.",
      reviews: [
        { id: 5, author: "Sarah Williams", avatar: "SW", rating: 5, content: "So relaxing and addictive! I love tending to my farm.", helpful: 78, notHelpful: 1 },
        { id: 6, author: "Tom Baker", avatar: "TB", rating: 5, content: "Incredible depth and charm. A must-play for any gamer.", helpful: 65, notHelpful: 3 },
      ]
    },
    {
      id: 4,
      title: "Red Dead Redemption 2",
      genre: "Action Adventure",
      price: 59.99,
      rating: 4.7,
      releaseYear: 2018,
      description: "Red Dead Redemption 2 is an action-adventure game developed and published by Rockstar Games. Set in the Wild West, it follows the story of outlaw Arthur Morgan.",
      reviews: [
        { id: 7, author: "Alex Turner", avatar: "AT", rating: 5, content: "The attention to detail in this game is unparalleled. A masterpiece!", helpful: 92, notHelpful: 4 },
        { id: 8, author: "Olivia Martinez", avatar: "OM", rating: 4, content: "Fantastic story and gameplay, but can feel slow at times.", helpful: 53, notHelpful: 7 },
      ]
    },
    {
      id: 5,
      title: "Minecraft",
      genre: "Sandbox",
      price: 26.95,
      rating: 4.8,
      releaseYear: 2011,
      description: "Minecraft is a sandbox video game developed by Mojang Studios. The game allows players to build with a variety of different blocks in a 3D procedurally generated world.",
      reviews: [
        { id: 9, author: "Chris Peterson", avatar: "CP", rating: 5, content: "Endless creativity and fun. Great for all ages!", helpful: 87, notHelpful: 3 },
        { id: 10, author: "Lisa Wong", avatar: "LW", rating: 4, content: "Amazing game, but can be overwhelming for beginners.", helpful: 42, notHelpful: 6 },
      ]
    },
    {
      id: 6,
      title: "Overwatch 2",
      genre: "First-Person Shooter",
      price: 0,
      rating: 4.3,
      releaseYear: 2022,
      description: "Overwatch 2 is a team-based multiplayer first-person shooter developed and published by Blizzard Entertainment. It's a free-to-play game with various heroes to choose from.",
      reviews: [
        { id: 11, author: "Emma Davis", avatar: "ED", rating: 4, content: "Fun and fast-paced gameplay, but microtransactions can be annoying.", helpful: 63, notHelpful: 8 },
        { id: 12, author: "Ryan Cooper", avatar: "RC", rating: 5, content: "Great improvement over the original. Love the new heroes!", helpful: 51, notHelpful: 3 },
      ]
    },
    {
      id: 7,
      title: "Civilization VI",
      genre: "Strategy",
      price: 59.99,
      rating: 4.6,
      releaseYear: 2016,
      description: "Civilization VI is a turn-based strategy 4X video game developed by Firaxis Games. It's the latest entry in the Civilization series.",
      reviews: [
        { id: 13, author: "Daniel Lee", avatar: "DL", rating: 5, content: "The best Civilization game yet. So many ways to play!", helpful: 76, notHelpful: 2 },
        { id: 14, author: "Sophie Brown", avatar: "SB", rating: 4, content: "Addictive gameplay, but can be overwhelming for newcomers.", helpful: 58, notHelpful: 7 },
      ]
    },
    {
      id: 8,
      title: "Among Us",
      genre: "Party",
      price: 4.99,
      rating: 4.5,
      releaseYear: 2018,
      description: "Among Us is an online multiplayer social deduction game developed and published by InnerSloth. Players complete tasks while trying to identify impostors among the crew.",
      reviews: [
        { id: 15, author: "Jake Wilson", avatar: "JW", rating: 5, content: "So much fun with friends! Simple yet addictive gameplay.", helpful: 89, notHelpful: 4 },
        { id: 16, author: "Mia Garcia", avatar: "MG", rating: 4, content: "Great party game, but can get repetitive with the same group.", helpful: 67, notHelpful: 9 },
      ]
    },
    {
      id: 9,
      title: "Hades",
      genre: "Roguelike",
      price: 24.99,
      rating: 4.9,
      releaseYear: 2020,
      description: "Hades is a roguelike action dungeon crawler developed and published by Supergiant Games. Players control Zagreus, the son of Hades, as he attempts to escape from the Underworld.",
      reviews: [
        { id: 17, author: "Liam Taylor", avatar: "LT", rating: 5, content: "Incredible art, music, and gameplay. A perfect roguelike!", helpful: 95, notHelpful: 1 },
        { id: 18, author: "Ava Robinson", avatar: "AR", rating: 5, content: "Addictive gameplay with a surprisingly deep story. Can't stop playing!", helpful: 82, notHelpful: 3 },
      ]
    },
    {
      id: 10,
      title: "It Takes Two",
      genre: "Co-op Adventure",
      price: 39.99,
      rating: 4.8,
      releaseYear: 2021,
      description: "It Takes Two is a cooperative action-adventure platform game developed by Hazelight Studios. The game follows the story of a couple on the verge of divorce who must work together to escape a fantastical world.",
      reviews: [
        { id: 19, author: "Noah Adams", avatar: "NA", rating: 5, content: "Best co-op game I've ever played. So creative and fun!", helpful: 103, notHelpful: 2 },
        { id: 20, author: "Isabella Kim", avatar: "IK", rating: 4, content: "Great game to play with a partner. Puzzles are clever and engaging.", helpful: 79, notHelpful: 5 },
      ]
    }
  ];


function Product() {
    const [mainImage, setMainImage] = useState("/MCC.jpg");
    const [currentIndex, setCurrentIndex] = useState(0);
    const params = useParams()
    const { cart, addToCart, updateQuantity } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [game, setGame] = useState(null)
    const [newReview, setNewReview] = useState({ rating: 5, content: '' })

    const images = ["/MCC.jpg", "/MCC2.jpg", "/MCC3.jpg", "/MCC4.jpg"];

    useEffect(() => {
        const productId = typeof params.product === 'string' ? parseInt(params.product, 10) : null
        if (productId) {
          const foundGame = games.find(g => g.id === productId)
          setGame(foundGame || null)
        }
      }, [params.product])

      const handleAddToCart = () => {
        if (game) {
          addToCart({
            id: game.id,
            title: game.title,
            price: game.price,
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

    // Automatically change the main image every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setMainImage(images[(currentIndex + 1) % images.length]);
        }, 4000);

        return () => clearInterval(interval); // Cleanup the interval
    }, [currentIndex, images]);

    // The main image changes when you click on the smaller ones
    const handleImageClick = (image) => {
        setMainImage(image);
        setCurrentIndex(images.indexOf(image));
    };

    return (
        <div className="min-h-screen w-full bg-gray-800 ">
            {/* <Navbar isLoggedIn={"True"}></Navbar> */}
            <div className='w-full flex flex-row justify-center gap-x-20  py-10 text-white font-black text-lg'>
                <div className="text-center ">
                <h1 className="text-1xl font-bold mb-4">
                        <Link href="/shop">
                            <span className="hover:text-yellow-500">All Games</span>
                        </Link> - Halo: The Master Chief Collection
                    </h1>
                    <h1 className="text-2xl font-bold mb-4">Halo: The Master Chief Collection</h1>
                    <img
                        src={mainImage}
                        alt="Main Halo Image"
                        className="w-96 mb-6 mx-auto border-2 border-white rounded-xl"
                    />
                    {/* Smaller Images */}
                    <div className="flex justify-center space-x-4 ">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Small Halo Image ${index + 1}`}
                                className={`w-16 cursor-pointer border-2  ${mainImage === image ? "border-yellow-500" : "border-white"
                                    }`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>

                    <ul className="list-disc list-inside mt-3 text-left pt-10">
                        <h1 className="text-2xl font-bold mb-4">System Requirments</h1>
                        <hr className="border-t-2 border-white my-4" />
                        <li>Requires a 64-bit processor and operating system</li>
                        <li>OS: Windows 7</li>
                        <li>Processor: AMD Phenom II X4 960T ; Intel i3550</li>
                        <li>Graphics: AMD HD 6850 ; NVIDIA GeForce GTS 450</li>
                        <li>DirectX: Version 11</li>
                        <li>Network: Broadband Internet connection</li>
                        <li>Storage: 43 GB available space</li>
                    </ul>



                </div>
                 <div className="pt-20">

                        <h1 className=" w-[375px] h-[] text-1xl font-bold mb-4">The Master Chief’s iconic journey includes six
                            games, built for PC and collected in a single integrated experience. Whether you’re a long-time fan or meeting Spartan 117 for the first time, The Master Chief Collection is the definitive Halo gaming experience.</h1>
                        <h1 className="text-2xl font-bold mb-4">Release Date: 3 Dec 2019</h1>
                        <h1 className="text-2xl font-bold mb-4">Developer: 343 Industries</h1>
                        <hr className="border-t-2 border-white my-4" />


                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold mb-4">£35.99</h1>
                            <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 hover:scale-110">
                                ADD TO CART
                            </button>
                        </div>
                        <br></br>
                        <h1 className="text-2xl font-bold mb-4 ">More Like This</h1>
                        <div className="grid grid-cols-2 gap-4 ">
                            <img src="/MLT1.jpg" alt="Photo 1" className="w-32 h-32 object-cover aspect-square border-2 border-white hover:scale-110" />
                            <img src="/MLT2.jpg" alt="Photo 2" className="w-32 h-32 object-cover aspect-square border-2 border-white hover:scale-110" />
                            <img src="/MLT3.jpg" alt="Photo 3" className="w-32 h-32 object-cover aspect-square border-2 border-white hover:scale-110" />
                            <img src="/MLT4.jpg" alt="Photo 4" className="w-32 h-32 object-cover aspect-square border-2 border-white hover:scale-110" />
                        </div>



                    
                </div>
            </div>
        </div>
    );
}


function ProductPicture () {
    return (
        <div className="">
            
        </div>
    )
}

export default Product;