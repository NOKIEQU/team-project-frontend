"use client";


import Navbar from "../components/navbar";
import React, { useState } from "react";
import Link from "next/link";




function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState(""); // Track selected payment method

  // Handler to update payment method
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };


    return (
      <div className="min-h-screen  bg-[#0d1b2a] text-white flex flex-col items-center p-10 ">
        <Navbar isLoggedIn={"False"}></Navbar>
   
        {/* Checkout Heading */}
       
        <h1 className="text-2xl font-bold text-yellow-500 mb-6 pt-12 ml-[-1650px]"> <Link href={"/basket"}>Back to Basket</Link></h1>
        <div className="flex space-x-4">
          <h1 className="text-4xl font-bold text-yellow-500 mr-[400px] mb-6 pt-10">CHECKOUT</h1>
        </div>
        <div className="flex flex-wrap w-full mr-[700px] mt-10 max-w-6xl gap-8 ">
         
          {/* Main Content */}
          <div className="flex-1">
            {/* Payment Section */}
            <section className="w-full bg-gray-900 rounded-lg p-12 mb-10 ">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                Payment Option
              </h2>
              <div className="flex flex-col space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="Visa"
                    onChange={() => handlePaymentChange("Visa")}
                    className="accent-yellow-500"
                  />
                  <img
                    src="visa.png"
                    alt="Visa"
                    className="w-12 h-12"
                  />
                  <span>Visa</span>
                </label>
   
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="Mastercard"
                    onChange={() => handlePaymentChange("Mastercard")}
                    className="accent-yellow-500"
                  />
                  <img
                    src="mastercard.png"
                    alt="Mastercard"
                    className="w-12 h-12"
                  />
                  <span>Mastercard</span>
   
                </label>
   
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="Paypal"
                    onChange={() => handlePaymentChange("Paypal")}
                    className="accent-yellow-500"
                  />
                  <img src="paypal.png" alt="Paypal" className="w-12 h-12" />
                  <span>Paypal</span>
                </label>
   
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="Apple Pay"
                    onChange={() => handlePaymentChange("Apple Pay")}
                    className="accent-yellow-500"
                  />
                  <img src="apple.png" alt="Apple Pay" className="w-12 h-12" />
                  <span>Apple Pay</span>
                </label>
               
              </div>
            </section>
   
            {/* Form Section */}
            <section className="w-full bg-gray-900 rounded-lg p-5 mb-10  ">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                CONFIRM PAYMENT
              </h2>
              <form className="flex flex-col space-y-4">
   
                <div className="flex space-x-4">
                  <input
                    type="email"
                    placeholder="Card Holder Name"
                    className="w-2/3 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                  />
                  <input
                    type="email"
                    placeholder="Address"
                    className="w-2/3 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                  />
                </div>
   
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-2/3 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Expiry Date"
                    className="w-1/3 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                  />
                  <input
                    type="text"
                    placeholder="CV"
                    className="w-1/3 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-3/4 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                />
   
                {/* changes the text based on selected method */}
                <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded transition transform hover:scale-110">
                  {paymentMethod
                    ? `Confirm Purchase with ${paymentMethod}`
                    : "Confirm Purchase"}
                </button>
              </form>
            </section>
          </div>
   
          {/* Summary section */}
          <aside className="  w-full h-full min-h-full max-w-sm bg-gray-900 rounded-lg p-5  ">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Summary</h2>
            <div className="grid grid-cols-4 gap-4 text-center text-white font-semibold">
              <h1>Items</h1>
              <h1>Price</h1>
              <h1>Quantity</h1>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mt-4 items-center">
              <div className="flex flex-col items-center">
                <span className=" font-bold text-sm"></span>
              </div>
              <div></div>
              <div></div>
             
            </div>
           
            <div className="mt-8">
            <hr className="border-t-2 border-white my-4" />
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">Coupon Code</h2>
            <input
                  type="text"
                  placeholder="Add a Coupon Code"
                  className="w-2/3 p-3 bg-gray-700 text-white rounded border border-yellow-500"
                />
            </div>
            <div className="mt-8">
            <hr className="border-t-2 border-white my-4" />
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">Total</h2>
              <h1 className="text-lg text-white">£1000</h1>
            </div>
          </aside>
        </div>
   
      </div>
    );
  }
   
  export default CheckoutPage;
 