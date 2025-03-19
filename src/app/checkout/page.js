"use client";

import React, { useState } from "react";

const Checkout = () => {
  const input =
    "w-full px-3 py-2 bg-transparent border-b-2 border-[#1A1A22] text-[#1A1A22]  text-sm outline-none mb-3";
  const label = "text-[#1A1A22] font-bold text-sm mb-1 block";
  const [selectedPayment, setSelectedPayment] = useState("MasterCard");
  const [openToast, setOpenToast] = useState(false);
  const handleSubmit = (e) => {
    setOpenToast(true);
  };
  return (
    <div style={{"font-family": "Oswald"}}>

      {openToast === false && (
      
      <div className=" min-h-screen pt-10 pb-10 bg-[#1A1A22] text-white flex flex-col justify-center items-center">
      
      <div
        className="w-[80%] flex flex-col md:flex-col lg:flex-row xl:flex-row 
justify-center md:justify-between lg:justify-between xl:justify-between
      "
      >
        <div className="flex flex-col sm:items-center  sm:w-full md:w-[80%] lg:w-[45%] xl:w-[45%]">
          {/* Order Summary */}
          <div className="bg-[#F0ECEC] shadow-lg  rounded-3xl   mb-4 w-full">
            <h2 className="p-4 text-2xl font-black text-black text-center">
              ORDER SUMMARY
            </h2>
            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="p-4 rounded-tl-lg border-gray-300 flex items-center justify-between">
              <div className="flex items-center">
                <lable className="pr-1 font-black text-black text-center">
                  X1
                </lable>
                <img
                  src="/back3.jpg"
                  alt="Game Vault Action"
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div className="">
                  <p className="text-black font-semibold">Game Vault Action</p>
                  <p className="text-sm text-gray-600">Price: £1,399.99</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                DELETE
              </button>
            </div>

            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="p-4 rounded-tl-lg border-gray-300 flex items-center justify-between">
              <div className="flex items-center">
                <lable className="pr-1 font-black text-black text-center">
                  X1
                </lable>
                <img
                  src="/back3.jpg"
                  alt="Game Vault Action"
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div className="">
                  <p className="text-black font-semibold">Game Vault Action</p>
                  <p className="text-sm text-gray-600">Price: £1,399.99</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                DELETE
              </button>
            </div>

            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="p-4 rounded-tl-lg border-gray-300 flex items-center justify-between">
              <div className="flex items-center">
                <lable className="pr-1 font-black text-black text-center">
                  X1
                </lable>
                <img
                  src="/back3.jpg"
                  alt="Game Vault Action"
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div className="">
                  <p className="text-black font-semibold">Game Vault Action</p>
                  <p className="text-sm text-gray-600">Price: £1,399.99</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                DELETE
              </button>
            </div>











            
            
            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <lable className="pr-1 font-black text-black text-center">
                  X2
                </lable>
                <img
                  src="/back3.jpg"
                  alt="Fortnite"
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <p className="text-black font-semibold">Fortnite</p>
                  <p className="text-sm text-gray-600">Price: £720.99</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                DELETE
              </button>
            </div>
            <div className="w-full h-[10px] bg-[#1A1A22]"></div>

            <div className="p-4 rounded-bl-lg">
              <p className="p-4 text-lg font-black text-black">
                TOTAL: £2841.97
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods & Payment Methods */}
        {/* style={{"align-items":"flex-end"}} */}
        <div className="flex flex-col sm:items-center md:items-center  sm:w-full md:w-[80%] lg:w-[45%] xl:w-[45%]">
          {/* Billing Address */}
          <div className="bg-[#F0ECEC] shadow-lg  rounded-3xl w-full pb-4 ">
            <h2 className="p-4 text-2xl font-black text-black text-center">
              BILLING ADDRESS
            </h2>
            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="p-4">
              <div className="flex-1">
                <label className={label}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Mario"
                  className={input}
                />
              </div>
              <div className="flex-1">
                <label className={label}>E-Mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. example@ex.com"
                  className={input}
                />
              </div>
              <div className="flex-1">
                <label className={label}>Country</label>
                <select className={input}>
                  <option>Country</option>
                  <option>Qatar</option>
                  <option>UK</option>
                </select>
              </div>
              <div className="flex-1">
                <label className={label}>Post Code</label>
                <input
                  type="text"
                  name="poastcode"
                  placeholder="e.g. B0xxxx"
                  className={input}
                />
              </div>
              <div className="flex-1">
                <label className={label}>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. 27 xxxst. xxxxx"
                  className={input}
                />
              </div>
              <div className="flex-1">
                <label className={label}>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. +00000"
                  className={input}
                />
              </div>
            </div>
            <div className="mb-10 w-full h-[10px] bg-[#1A1A22]"></div>
          </div>

          {/* Payment Methods */}
          <div className="bg-[#F0ECEC] shadow-lg  rounded-3xl  mt-4 w-full">
            <h2 className="p-4 text-2xl font-black text-black text-center">
              PAYMENT METHODS
            </h2>
            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="pt-4 pb-4  rounded-tl-lg border-gray-300 flex-col flex items-center justify-between">
              <div className="flex items-center justify-between w-[90%]">
                <img
                  src="/visa_1.png"
                  alt="Game Vault Action"
                  className="w-1/4 rounded-lg"
                />
                <span className="font-black text-sm text-[#1A1A22]">
                  VisaCard
                </span>
                <button
                  className={`font-black flex w-[100px] items-center justify-between p-3 rounded ${
                    selectedPayment === "Visa"
                      ? "bg-white text-[#1A1A22]"
                      : "bg-[#1A1A22] text-white"
                  }`}
                  onClick={() => setSelectedPayment("Visa")}
                >
                  <span className="font-black  text-sm ml-1 w-full">
                    {selectedPayment === "Visa" ? "Selected" : "pay"}
                  </span>
                </button>
              </div>

              {selectedPayment === "Visa" && (
                <div className="flex flex-col max-w-[90%] w-[90%]">
                  <div className="flex justify-between">
                    <div className="w-[60%]">
                      {/* <label className={label}>E-Mail</label> */}
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="insert the 16 digit numbers"
                        className={input}
                      />
                    </div>
                    <div className="w-[35%]">
                      {/* <label className={label}>E-Mail</label> */}
                      <input
                        type="text"
                        name="expairyDate"
                        placeholder="Expiry Date"
                        className={input}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-[35%]">
                        {/* <label className={label}>E-Mail</label> */}
                        <input
                          type="text"
                          name="cvv"
                          placeholder="cvv"
                          className={input}
                        />
                      </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="pt-4 pb-4 rounded-tl-lg border-gray-300 flex-col flex items-center justify-between">
            <div className="flex items-center justify-between w-[90%]">
              <img
                src="/aMastercard.png"
                alt="Game Vault Action"
                className="w-1/4 rounded-lg"
              />
              <span className="font-black text-sm text-[#1A1A22]">
                MasterCard
              </span>
              <button
                className={` font-black flex  w-[100px] items-center justify-between p-3 rounded ${
                  selectedPayment === "MasterCard"
                    ? "bg-white text-[#1A1A22]"
                    : "bg-[#1A1A22] text-white"
                }`}
                onClick={() => setSelectedPayment("MasterCard")}
              >
                <span className="font-black text-sm ml-1 w-full">
                  {selectedPayment === "MasterCard" ? "Selected" : "pay"}
                </span>
              </button>
              </div>
              {selectedPayment === "MasterCard" && (
                <div className="flex flex-col max-w-[90%] w-[90%]">
                  <div className="flex justify-between">
                    <div className="w-[60%]">
                      {/* <label className={label}>E-Mail</label> */}
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="insert the 16 digit numbers"
                        className={input}
                      />
                    </div>
                    <div className="w-[35%]">
                      {/* <label className={label}>E-Mail</label> */}
                      <input
                        type="text"
                        name="expairyDate"
                        placeholder="Expiry Date"
                        className={input}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-[35%]">
                        {/* <label className={label}>E-Mail</label> */}
                        <input
                          type="text"
                          name="cvv"
                          placeholder="cvv"
                          className={input}
                        />
                      </div>
                  </div>
                </div>
              )}

            </div>

            <div className="w-full h-[10px] bg-[#1A1A22]"></div>
            <div className="pb-4 pt-4 rounded-tl-lg border-gray-300 flex items-center justify-between justify-around">
              <div className="flex items-center justify-between w-[90%]">
                <img
                  src="/Paypal-Logo2.png"
                  alt="Game Vault Action"
                  className="w-1/4 rounded-lg"
                />
                <span className="font-black text-sm text-[#1A1A22]">PayPal</span>
                <button
                  className={` font-black flex  w-[100px] items-center justify-between p-3 rounded ${
                    selectedPayment === "PayPal"
                      ? "bg-white text-[#1A1A22]"
                      : "bg-[#1A1A22] text-white"
                  }`}
                  onClick={() => setSelectedPayment("PayPal")}
                >
                  <span className="font-black text-sm ml-1 w-full">
                    {selectedPayment === "PayPal" ? "Selected" : "pay"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      
      {/* Submit Button */}
      <button onClick={handleSubmit} className="mt-6 px-10 py-4 bg-[#F0ECEC] text-[#1A1A22] font-black rounded-3xl border-gray-600 border transition-colors duration-300 hover:bg-[#fff]">
        SUBMIT
      </button>
      </div>
      )}



      {openToast === true && (
      <div className="flex flex-col font-sans bg-[#1A1A22] h-full">
        <div className="flex flex-1 flex-col lg:flex-row">
            <div className="flex-[1.8] relative overflow-hidden flex justify-start items-center text-white">
              <img
                  src="/back.webp"
                  alt="Left Side"
                  className="absolute top-0 left-0 h-full w-full z-10 object-cover"
                  style={{
                      clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                  }}
              />
                <div className="absolute top-0 right-0 w-full h-full z-20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <polygon
                            points="77.5,0 85,0 65,100 55,100"
                            fill="rgba(255, 255, 255, 0.4)"
                        />
                        <polygon
                            points="90,0 100,0 80,100 70,100"
                            fill="rgba(255, 255, 255, 0.8)"
                        />
                    </svg>
                </div>
            
      </div>
      <div className="flex-1 flex flex-col items-center p-6 sm:p-4 lg:p-8 sm:w-full lg:w-1/2 min-h-screen justify-center">
                        <div className="flex">
                            
                            <label style={{"font-family": "Oswald"}} className="text-white text-3xl font-black">
                            Your payment has been made successfully!
                            </label>
                        </div>
                        <a href="/" className="mt-6 px-6 py-2 bg-[#D9D9D9] text-[#1A1A22] font-black rounded-3xl border-gray-600 border transition-colors duration-300 hover:bg-[#fff]">
                                HOME
                            </a>
      </div>
    </div>
      </div>
      )}
<svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            
                            style={{"position": "absolute","top": "135vh","width":"54%","height":"50%"}}
                        >
                            <polygon
                                points="0,10 0,0 100,75 100,85"
                                fill="rgba(255, 255, 255, 0.4)"
                            />
                            <polygon
                                points="0,15 0,25 100,100 100,90"
                                fill="rgba(255, 255, 255, 0.8)"
                            />
      </svg>
    </div>
    
  );
};

export default Checkout;
