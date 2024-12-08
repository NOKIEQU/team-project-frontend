"use client";
import React, { useState } from "react";
 
function CheckoutPage() {
  const [pickedPayment, setPickedPayment] = useState("");
  const [coupons, setCoupons] = useState("");
  const [form, setForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
  });
 
  const orderSummary = {
    items: [
      { name: "Halo", price: 20, quantity: 2, imgSrc: "/halo.png" },
      { name: "Detroit Become Human", price: 35, quantity: 1, imgSrc: "/detroit.png" }
    ],
    total: 0
  };
 
 
  orderSummary.total = orderSummary.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
 
  const selectPayment = (method) => {
    setPickedPayment(method);
    if (method === "click-to-pay") {
      window.location.href = "https://www.paypal.com/checkout";
    }
  };
 
  const applyCoupon = (e) => {
    setCoupons(e.target.value);
  };
 
  const updateInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
 
  const updateCardNumber = (e) => {
    const { value } = e.target;
 
    if (/[^0-9\s]/.test(value)) return;
    setForm({
      ...form,
      cardNumber: value
    });
  };
 
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", form);
  };
 
  const submitBillingForm = (e) => {
    e.preventDefault();
    console.log("Billing form data submitted:", form);
  };
 
  const submitCardForm = (e) => {
    e.preventDefault();
    console.log("Card form data submitted:", form);
  };
 
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center p-4 sm:p-6 font-sans">
      <header className="flex flex-col sm:flex-row justify-between w-full max-w-6xl items-center mb-8">
        <div className="flex items-center space-x-3"></div>
      </header>
 
      <div className="flex flex-col sm:flex-row w-full max-w-6xl gap-6 sm:gap-8">
        {/* Checkout Form */}
        <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg font-sans">
          <h2 className="text-4xl font-bold text-[#f6a302] border-b-2 border-[#f6a302] mb-6 font-sans">
            Payment Details
          </h2>
 
          {/* Payment Options */}
          <div className="mb-8 font-sans">
            <h3 className="text-2xl font-semibold text-white mb-4 font-sans">Choose Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 font-sans">
              {[{
                label: "GameVault Gift Card",
                method: "gift-card",
                imgSrc: "/logo.svg",
              }, {
                label: "GameVault Points",
                method: "points",
                imgSrc: "/logo.svg",
              }, {
                label: "Credit or Debit Card",
                method: "credit-card",
                imgSrc: "/card1.png",
              }, {
                label: "Pay with Paypal",
                method: "click-to-pay",
                imgSrc: "/Paypal.png",
              }].map((option) => (
                <label
                  key={option.method}
                  className={`flex items-center space-x-4 bg-[#0d1b2a] p-4 rounded-lg hover:bg-gray-600 cursor-pointer border-2 border-transparent ${pickedPayment === option.method ? 'border-[#f6a302]' : ''} font-sans`}
                  onClick={() => selectPayment(option.method)}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    className="accent-[#f6a302] hidden"
                    checked={pickedPayment === option.method}
                    readOnly
                  />
                  <div className="flex items-center space-x-3 font-sans">
                    <img
                      src={option.imgSrc}
                      alt={option.label}
                      className="w-12 h-12 rounded"
                    />
                    <span className="text-white font-medium text-lg font-sans">{option.label}</span>
                  </div>
                  <span
                    className={`inline-block w-4 h-4 rounded-full ${pickedPayment === option.method ? 'bg-[#f6a302]' : 'bg-gray-500'}`}></span>
                </label>
              ))}
            </div>
          </div>
 
          {/* Gift Card and Points */}
          {pickedPayment === "gift-card" && (
            <div className="mt-6 bg-[#0d1b2a] p-4 rounded-lg shadow-md font-sans">
              <h4 className="text-2xl font-bold text-[#f6a302] mb-4 border-b-2 border-[#f6a302] font-sans">Gift Card Details</h4>
              <p className="text-gray-100 mb-4 font-sans">Please enter your GameVault Gift Card code below to apply it to your purchase.</p>
              <input
                type="text"
                placeholder="Enter Gift Card Code"
                className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
                required
                aria-label="Gift Card Code"
              />
              <button className="mt-2 py-2 px-4 bg-[#f6a302] text-black font-semibold text-lg rounded hover:bg-[#fa9a00ef] focus:outline-none focus:ring-2 focus:ring-[#f6a302] focus:ring-opacity-50 font-sans">
                Apply Gift Card
              </button>
            </div>
          )}
 
          {pickedPayment === "points" && (
            <div className="mt-6 bg-[#0d1b2a] p-4 rounded-lg shadow-md font-sans">
              <h4 className="text-2xl font-bold text-[#f6a302] mb-4 border-b-2 border-[#f6a302] font-sans">Points Details</h4>
              <p className="text-white mb-4 font-sans">You have <strong>0</strong> GameVault Points available for use.</p>
            </div>
          )}
 
          {/* Credit Card Section */}
          {pickedPayment === "credit-card" && (
            <div className="mt-6 bg-[#0d1b2a] p-6 rounded-lg shadow-md font-sans">
              <h4 className="text-2xl font-bold text-[#f6a302] mb-4 border-b-2 border-[#f6a302] font-sans">Enter Card Details</h4>
              <form className="grid grid-cols-1 gap-4 font-sans" onSubmit={submitCardForm}>
                <input
                  type="text"
                  name="cardHolderName"
                  placeholder="Cardholder Name"
                  className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
                  value={form.cardHolderName}
                  onChange={updateInput}
                  required
                  aria-label="Cardholder Name"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
                  value={form.cardNumber}
                  maxLength="16"
                  onChange={updateCardNumber}
                  required
                  aria-label="Card Number"
                />
                <div className="grid grid-cols-2 gap-4 font-sans">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
                    value={form.expiryDate}
                    onChange={updateInput}
                    maxLength="5"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
                    value={form.cvv}
                    onChange={updateInput}
                    maxLength="3"
                    required
                  />
                </div>
                <button type="submit" className="mt-4 py-2 px-4 bg-[#f6a302] text-black font-semibold text-lg rounded hover:bg-[#fa9a00ef] focus:outline-none focus:ring-2 focus:ring-[#f6a302] focus:ring-opacity-50 font-sans">
                  Submit Payment
                </button>
              </form>
            </div>
          )}
        </div>
 
        {/* Billing Form */}
        <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg font-sans">
          <h2 className="text-4xl font-bold text-[#f6a302] border-b-2 border-[#f6a302] mb-6 font-sans">Billing Details</h2>
          <form className="grid grid-cols-1 gap-4 font-sans" onSubmit={submitBillingForm}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
              value={form.name}
              onChange={updateInput}
              required
              aria-label="Full Name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
              value={form.email}
              onChange={updateInput}
              required
              aria-label="Email Address"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
              value={form.address}
              onChange={updateInput}
              required
              aria-label="Street Address"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
              value={form.city}
              onChange={updateInput}
              required
              aria-label="City"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
              value={form.country}
              onChange={updateInput}
              required
              aria-label="Country"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className="w-full p-3 bg-transparent text-white rounded-lg border-b-2 border-[#f6a302] text-lg font-bold font-sans"
              value={form.postalCode}
              onChange={updateInput}
              required
              aria-label="Postal Code"
            />
            <button type="submit" className="mt-4 py-2 px-4 bg-[#f6a302] text-black font-semibold text-lg rounded hover:bg-[#fa9a00ef] focus:outline-none focus:ring-2 focus:ring-[#f6a302] focus:ring-opacity-50 font-sans">
              Submit Billing Information
            </button>
          </form>
        </div>
      </div>
 
      {/* Order Summary */}
<div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg font-sans w-full max-w-6xl">
  <h2 className="text-4xl font-bold text-[#f6a302] border-b-2 border-[#f6a302] mb-6 font-sans">Order Summary</h2>
  <div className="font-sans">
    <h3 className="text-2xl font-semibold text-white mb-4 font-sans">Items</h3>
    <ul>
      {orderSummary.items.map((item, index) => (
        <li key={index} className="flex justify-between mb-4 font-sans">
          <div className="flex items-center space-x-4">
            <img src={item.imgSrc} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex flex-col">
              <span className="text-white font-semibold">{item.name}</span>
              <span className="text-gray-400">Quantity: {item.quantity}</span>
            </div>
          </div>
          <span className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <div className="flex justify-between mt-4 font-sans">
      <h4 className="text-lg font-semibold text-white">Total</h4>
      <span className="text-lg font-semibold text-[#f6a302]">${orderSummary.total.toFixed(2)}</span>
    </div>
  </div>
</div>
 
    </div>
  );
}
 
export default CheckoutPage;