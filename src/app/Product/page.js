"use client";

import { useState, useEffect } from "react";


function Product() {
    const [mainImage, setMainImage] = useState("MCC.jpg");
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = ["MCC.jpg", "MCC2.jpg", "MCC3.jpg", "MCC4.jpg"];

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
        <div className="w-full h-screen bg-gray-400 ">
            {/* <Navbar isLoggedIn={"True"}></Navbar> */}
            <div className='w-full flex justify-center py-4 text-white font-black text-lg '>
                <div className="text-center ">
                    <h1 className="text-1xl font-bold mb-4">All Games -  Halo: The Master Chief Collection</h1>
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

                    <ul className="list-disc list-inside mt-3 text-left">
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
                <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-4">More Like This</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="MLT1.jpg" alt="Photo 1" className="w-32 h-32 object-cover aspect-square border-2 border-white" />
                        <img src="MLT2.jpg" alt="Photo 2" className="w-32 h-32 object-cover aspect-square border-2 border-white" />
                        <img src="MLT3.jpg" alt="Photo 3" className="w-32 h-32 object-cover aspect-square border-2 border-white" />
                        <img src="MLT4.jpg" alt="Photo 4" className="w-32 h-32 object-cover aspect-square border-2 border-white" />
                    </div>

                    <div className="">
                        <hr className="border-t-2 border-white my-4" />
                        <h1 className="text-2xl font-bold mb-4">Release Date: 3 Dec 2019</h1>
                        <h1 className="text-2xl font-bold mb-4">Developer: 343 Industries</h1>
                        <hr className="border-t-2 border-white my-4" />


                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold mb-4">£35.99</h1>
                            <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-400">
                                ADD TO CART
                            </button>
                        </div>




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