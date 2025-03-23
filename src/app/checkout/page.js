"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/cart-context";
import { useUser } from "../../context/user-context";
import {
  CreditCard,
  Wallet, 
  Gift, 
  ArrowLeft,
  Check
} from "lucide-react";
import Image from "next/image";

function CheckoutPage() {
  const router = useRouter();
  const { user } = useUser();
  const { cart, getCartTotal, clearCart } = useCart();
  
  useEffect(() => {
    console.log("Current user from context:", user);
  }, [user]);
  
  const totalAmount = getCartTotal();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    deliveryEmail: "", 
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    giftCardNumber: "",
    giftCardPin: ""
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  
  useEffect(() => {
    if (user) {
      console.log("User data found:", user);
      
      const firstName = user.user.firstName || "";
      const lastName = user.user.lastName || "";
      const email = user.user.email || "";
      
      setFormData(prev => ({
        ...prev,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName,
        email: email || prev.email,
        deliveryEmail: email || prev.deliveryEmail 
      }));
      
      console.log("Form data after auto-fill:", { firstName, lastName, email });
    } else {
      console.log("No user data available");
    }
  }, [user]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  
  const isFormValid = () => {
    let requiredFields = ["firstName", "lastName", "email", "deliveryEmail"];
    
    if (paymentMethod === "creditCard") {
      requiredFields = [...requiredFields, "cardNumber", "cardName", "expiryDate", "cvv"];
    } else if (paymentMethod === "giftCard") {
      requiredFields = [...requiredFields, "giftCardNumber"];
    }
    
    return requiredFields.every(field => formData[field].trim() !== "");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    

      try {
        const response = await fetch(`http://51.77.110.253:3001/api/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            user: {
              id: user.user.id,
            }
          }),
        });
  
        const data = await response.json();
        setOrderId(data.id);
        setOrderTotal(data.totalPrice);
        setIsProcessing(false);
        setIsOrderComplete(true);
        clearCart();
        if (!response.ok) {
          throw new Error(`Failed to delete game: ${response.statusText}`);
        }
  
      } catch (error) {
        console.error("Error submiting:", error);
      }

      
      
  };
  
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      console.log("No user is logged in. Consider redirecting to login.");
    }
  }, [user, router]);

  if (cart.length === 0 && !isOrderComplete) {
    return (
      <div className="bg-[#1A1A22] min-h-screen text-white p-6 lg:p-16 flex flex-col items-center justify-center font-oswald">
        <h1 className="text-3xl font-bold mb-4">Your basket is empty</h1>
        <p className="text-gray-400 mb-8">You need to add games to your basket before checkout.</p>
        <Link href="/shop">
          <button className="bg-[#FFA800] hover:bg-[#e08800] px-6 py-3 text-white rounded-full font-bold transition-all duration-300 flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }
  
  // Order complete screen
  if (isOrderComplete) {
    return (
      <div className="bg-[#1A1A22] min-h-screen text-white p-6 lg:p-16 flex flex-col items-center justify-center font-oswald">
        <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full">
              <Check size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Order Confirmed!</h1>
          <p className="text-gray-300 mb-6 text-center">
            Thank you for your purchase. Your games will be delivered shortly.
          </p>
          <div className="bg-[#1A1A22] p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Order ID:</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Total Amount:</span>
              <span className="font-medium">£{orderTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery Email:</span>
              <span className="font-medium">{formData.deliveryEmail}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-6 text-center text-sm">
            Your game access codes and download links will be sent to {formData.deliveryEmail}
          </p>
          <Link href="/shop">
            <button className="w-full bg-[#FFA800] hover:bg-[#e08800] text-white py-3 rounded-full font-bold transition-all duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#1A1A22] min-h-screen text-white p-6 lg:p-16 font-oswald">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-[#F0ECEC]/10 p-2 rounded-full">
            <Image 
              src="/account/profilepic.png"  
              alt="Profile Icon"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">Checkout</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Your Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Delivery Email Address *</label>
                  <input
                    type="email"
                    name="deliveryEmail"
                    value={formData.deliveryEmail}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                    required
                  />
                  <p className="text-gray-400 text-sm mt-1">Game access codes will be sent to this email</p>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div 
                    className={`flex items-center gap-2 bg-[#1A1A22] px-4 py-3 rounded-lg cursor-pointer £{paymentMethod === 'creditCard' ? 'border-2 border-[#FFA800]' : 'border border-[#3A3A4A]'}`}
                    onClick={() => handlePaymentMethodChange('creditCard')}
                  >
                    <input 
                      type="radio" 
                      id="creditCard" 
                      name="paymentMethod" 
                      value="creditCard" 
                      checked={paymentMethod === 'creditCard'}
                      onChange={() => handlePaymentMethodChange('creditCard')}
                    />
                    <label htmlFor="creditCard" className="flex items-center cursor-pointer">
                      <CreditCard size={20} className="mr-2 text-[#FFA800]" />
                      Credit / Debit Card
                    </label>
                  </div>
                  
                  <div 
                    className={`flex items-center gap-2 bg-[#1A1A22] px-4 py-3 rounded-lg cursor-pointer £{paymentMethod === 'paypal' ? 'border-2 border-[#FFA800]' : 'border border-[#3A3A4A]'}`}
                    onClick={() => handlePaymentMethodChange('paypal')}
                  >
                    <input 
                      type="radio" 
                      id="paypal" 
                      name="paymentMethod" 
                      value="paypal" 
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handlePaymentMethodChange('paypal')}
                    />
                    <label htmlFor="paypal" className="flex items-center cursor-pointer">
                      <Wallet size={20} className="mr-2 text-[#FFA800]" />
                      PayPal
                    </label>
                  </div>
                  
                  <div 
                    className={`flex items-center gap-2 bg-[#1A1A22] px-4 py-3 rounded-lg cursor-pointer £{paymentMethod === 'giftCard' ? 'border-2 border-[#FFA800]' : 'border border-[#3A3A4A]'}`}
                    onClick={() => handlePaymentMethodChange('giftCard')}
                  >
                    <input 
                      type="radio" 
                      id="giftCard" 
                      name="paymentMethod" 
                      value="giftCard" 
                      checked={paymentMethod === 'giftCard'}
                      onChange={() => handlePaymentMethodChange('giftCard')}
                    />
                    <label htmlFor="giftCard" className="flex items-center cursor-pointer">
                      <Gift size={20} className="mr-2 text-[#FFA800]" />
                      Gift Card
                    </label>
                  </div>
                </div>
                
                {/* Credit Card */}
                {paymentMethod === 'creditCard' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                        required={paymentMethod === 'creditCard'}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Name on Card *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                        required={paymentMethod === 'creditCard'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                          required={paymentMethod === 'creditCard'}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Security Code (CVV) *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                          required={paymentMethod === 'creditCard'}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* PayPal*/}
                {paymentMethod === 'paypal' && (
                  <div className="bg-[#1A1A22] p-4 rounded-lg">
                    <p className="text-gray-300">
                      You will be redirected to PayPal to complete your purchase securely after clicking "Complete Order".
                    </p>
                  </div>
                )}
                
                {/* Gift Card Form */}
                {paymentMethod === 'giftCard' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Gift Card Number *</label>
                      <input
                        type="text"
                        name="giftCardNumber"
                        value={formData.giftCardNumber}
                        onChange={handleChange}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:ring-0"
                        required={paymentMethod === 'giftCard'}
                      />
                    </div>
                    <div className="mt-2 text-gray-300 text-sm">
                      <p>Enter the gift card number exactly as it appears on your gift card.</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <Link href="/basket">
                  <button type="button" className="flex items-center bg-[#252530] hover:bg-[#3A3A4A] text-white px-6 py-3 rounded-full transition-colors">
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Basket
                  </button>
                </Link>
                
                <button
                  type="submit"
                  className="bg-[#FFA800] hover:bg-[#e08800] px-8 py-3 text-white rounded-full font-bold transition-all duration-300 flex items-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-white rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-4 border-b border-[#3A3A4A] pb-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg">
                      <img 
                        src={item.img || "/placeholder.svg"} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-300">Qty: {item.quantity}</span>
                        <span>£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">£{totalAmount.toFixed(2)}</span>
              </div>

              <div className="bg-[#1A1A22] p-4 rounded-lg text-gray-300 text-sm">
                <p>Digital games will be delivered immediately to your delivery email after purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;